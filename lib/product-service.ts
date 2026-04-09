import apiClient from "@/lib/axiosClient"

// Tipe data return
interface FetchAllResponse {
  data: any[]; // Data mentah dari API
  totalProducts: number;
  totalPages: number;
}

export const fetchAllProductsFromApi = async (): Promise<FetchAllResponse> => {
  try {
    const endpoint = '/api/products'
    
    // Ambil Page 1 Dulu (Intelligent Check)
    const initialResponse = await apiClient.get(endpoint, { 
        params: { page: 1, limit: 100 } 
    })
    
    if (!initialResponse.data.success && !initialResponse.data.data) {
         throw new Error("Failed to fetch initial data")
    }

    let allRawData = initialResponse.data.data || []
    
    const fetchedTotalPages = initialResponse.data.pagination?.totalPages || 1
    const fetchedTotalProducts = initialResponse.data.pagination?.total || 0

    // Fetch Sisanya secara paralel
    if (fetchedTotalPages > 1) {
        const promises = []
        
        for (let i = 2; i <= fetchedTotalPages; i++) {
            promises.push(apiClient.get(endpoint, { params: { page: i, limit: 100 } }))
        }

        const responses = await Promise.all(promises)
        
        // Gabung data nya
        responses.forEach(res => {
            if (res.data?.data) {
                allRawData = [...allRawData, ...res.data.data]
            }
        })
    }

    // return data mentah & info pagination
    return {
      data: allRawData,
      totalProducts: fetchedTotalProducts,
      totalPages: fetchedTotalPages
    }

  } catch (error) {
    console.error("Error in product-service:", error)
    throw error // Lempar error agar bisa ditangkap di component
  }
}