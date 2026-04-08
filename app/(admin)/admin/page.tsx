import Link from "next/link"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react"
import { formatPrice } from "@/lib/product-utils"
import { serverApiClient } from "@/lib/serverApiClient"

type ProductsResponse = { success: boolean; data: any[] }
type StatsResponse = { success: boolean; data: { totalOrders: number; totalRevenue: number } }
type UsersResponse = { success: boolean; data: any[] }

// Helper untuk Decode Token
function getUserFromToken(token: string) {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString())
    return {
      role: decoded.role || "admin",
    }
  } catch (error) {
    return null
  }
}

export default async function AdminDashboard() {
  
  let products: any[] = [];
  let orderStats = { totalOrders: 0, totalRevenue: 0 };
  let totalUsers = 0; 
  
  // Logic Ambil Cookie & Cek Role
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  let isSuperAdmin = false
  
  if (token) {
    const user = getUserFromToken(token)
    isSuperAdmin = user?.role === "super_admin"
  }

  try {
    // Fetch Products
    const productsRes = await serverApiClient.get<ProductsResponse>("/api/products/admin/all?limit=1000");
    const rawProducts = productsRes.data || [];
    products = rawProducts.filter((product: any) => product && product.id);

    // Fetch Stats
    const statsRes = await serverApiClient.get<StatsResponse>("/api/orders/admin/stats");
    orderStats = statsRes.data || { totalOrders: 0, totalRevenue: 0 };

    // Fetch Users (if: Super Admin)
    if (isSuperAdmin) {
        const usersRes = await serverApiClient.get<UsersResponse>("/api/users/admin?excludeSuperAdmins=false");
        const usersData = usersRes.data || [];
        totalUsers = usersData.length;
    }

  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }

  // Recent Products Logic
  const recentProducts = [...products]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div>
        <h1 className="text-3xl font-bold font-jakarta mb-8 text-gray-800">Dashboard Overview</h1>
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             
             {/* Total Products */}
             <Card className="shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                    <p className="text-xs text-gray-400 mt-1">Active items in catalog</p>
                </CardContent>
            </Card>
            
             {/* Total Orders */}
             <Card className="shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{orderStats.totalOrders}</div>
                    <p className="text-xs text-gray-400 mt-1">Lifetime orders</p>
                </CardContent>
            </Card>

             {/* Total Revenue */}
             <Card className="shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{formatPrice(orderStats.totalRevenue)}</div>
                    <p className="text-xs text-gray-400 mt-1">Gross income</p>
                </CardContent>
            </Card>

            {/* Total Users (Dynamic Data) */}
            {isSuperAdmin && (
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  {/* Tampilkan totalUsers yang sudah di-fetch */}
                  <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
                  <p className="text-xs text-gray-400 mt-1">Registered accounts</p>
                </CardContent>
              </Card>
            )}
        </div>

        {/* RECENT PRODUCTS TABLE */}
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-jakarta font-bold text-gray-800">Recent Products</h2>
                <Link href="/admin/products" className="text-sm font-jakarta text-blue-600 hover:text-blue-700 font-medium">
                    View All
                </Link>
            </div>

            {recentProducts.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                    <tr className="font-jakarta">
                    <th className="px-6 py-3 font-medium">Product Name</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentProducts.map((product: any) => (
                    <tr key={product.id} className="hover:bg-blue-50 transition-colors font-jakarta">
                        <td className="px-6 py-4 font-medium text-gray-900">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                                    <img 
                                        src={product.images && product.images[0] ? product.images[0] : "/placeholder.jpg"} 
                                        alt="" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="truncate max-w-[200px]">{product.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                            {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                        <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                            Edit
                        </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ) : (
            <div className="text-center py-12 px-4">
                <p className="font-jakarta text-gray-500 mb-4">No products found.</p>
                <Link href="/admin/products/new" className="text-blue-600 font-jakarta font-medium hover:underline">
                Create your first product
                </Link>
            </div>
            )}
        </div>

        {/* QUICK ACTIONS */}
        <div>
            <h2 className="text-lg font-jakarta font-bold mb-4 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionLink 
                href="/admin/products/new" 
                title="Add New Product" 
                desc="Create a new listing" 
            />
            <QuickActionLink 
                href="/admin/categories/new" 
                title="Add New Category" 
                desc="Create product category" 
            />
            <QuickActionLink 
                href="/admin/users/new" 
                title="Add New User" 
                desc="Register new admin" 
            />
            {isSuperAdmin && (
                <QuickActionLink 
                    href="/admin/logs" 
                    title="View Logs" 
                    desc="Audit system activity" 
                />
            )}
            </div>
        </div>
    </div>
  )
}

function QuickActionLink({ href, title, desc }: { href: string, title: string, desc: string }) {
    return (
        <Link href={href} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group">
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </Link>
    )
}