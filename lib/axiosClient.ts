import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag untuk mencegah infinite loop saat refresh token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// REQUEST INTERCEPTOR (Attach Token)
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR (Handle 401 & Refresh)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 dan belum pernah dicoba refresh sebelumnya
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      
      // Cek apakah ada refresh token
      const refreshToken = Cookies.get("admin_refresh_token");

      if (isRefreshing) {
        // Jika sedang refresh, masukkan request ke antrian
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Mulai proses refresh
      originalRequest._retry = true;
      isRefreshing = true;

      // Jika tidak ada refresh token, langsung logout
      if (!refreshToken) {
         handleLogout();
         return Promise.reject(error);
      }

      try {
        // Panggil API Refresh
        // NOTE: Sesuaikan payload body jika backend meminta format lain (misal: { token: ... })
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"}/api/auth/refresh`, 
            { refreshToken } 
        );

        if (response.data && response.data.success) {
            // Ambil token baru dari response
            const newAccessToken = response.data.data.accessToken || response.data.data.token;
            const newRefreshToken = response.data.data.refreshToken; // Optional: jika rotasi refresh token

            // Update Cookie
            Cookies.set("admin_token", newAccessToken, { expires: 1, secure: true, sameSite: 'strict' });
            if (newRefreshToken) {
                Cookies.set("admin_refresh_token", newRefreshToken, { expires: 7, secure: true, sameSite: 'strict' });
            }

            // Update header default axios
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            
            // Proses antrian request yang tertunda
            processQueue(null, newAccessToken);
            
            // Ulangi request yang gagal tadi dengan token baru
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
        } else {
            throw new Error("Refresh failed");
        }

      } catch (err) {
        processQueue(err, null);
        handleLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Helper function untuk logout bersih
function handleLogout() {
    Cookies.remove("admin_token");
    Cookies.remove("admin_refresh_token");
    if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/admin/login";
    }
}

export default apiClient;