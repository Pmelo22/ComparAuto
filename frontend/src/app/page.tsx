import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Globe, Menu, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 text-rose-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm0 27c-6.07 0-11-4.93-11-11S9.93 5 16 5s11 4.93 11 11-4.93 11-11 11z" />
              <path d="M16 8c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-rose-500">airbnb</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center border rounded-full shadow-sm px-2 py-1 divide-x">
            <button className="px-4 py-1 font-medium text-sm">Anywhere</button>
            <button className="px-4 py-1 font-medium text-sm">Any week</button>
            <button className="px-4 py-1 text-gray-500 text-sm">Add guests</button>
            <button className="ml-2 p-2 bg-rose-500 text-white rounded-full">
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex text-sm font-medium rounded-full">
              Airbnb your home
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            <div className="flex items-center border rounded-full p-1 shadow-sm">
              <Menu className="h-5 w-5 mx-2" />
              <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <Button variant="outline" className="w-full flex items-center justify-between rounded-full shadow-sm border">
            <div className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div className="font-medium text-sm">Anywhere</div>
                <div className="text-xs text-gray-500">Any week · Add guests</div>
              </div>
            </div>
            <div className="border rounded-full p-2">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 8a3 3 0 0 1 6 0 3 3 0 0 1-6 0z" />
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            </div>
          </Button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="border-b sticky top-[72px] bg-white z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto py-4 scrollbar-hide gap-8">
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Beachfront" className="h-6 w-6" />
              <span className="text-xs">Beachfront</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Cabins" className="h-6 w-6" />
              <span className="text-xs">Cabins</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Tiny homes" className="h-6 w-6" />
              <span className="text-xs">Tiny homes</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Design" className="h-6 w-6" />
              <span className="text-xs">Design</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Arctic" className="h-6 w-6" />
              <span className="text-xs">Arctic</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Amazing pools" className="h-6 w-6" />
              <span className="text-xs">Amazing pools</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Islands" className="h-6 w-6" />
              <span className="text-xs">Islands</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Lakefront" className="h-6 w-6" />
              <span className="text-xs">Lakefront</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Countryside" className="h-6 w-6" />
              <span className="text-xs">Countryside</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[56px]">
              <img src="/placeholder.svg?height=24&width=24" alt="Mansions" className="h-6 w-6" />
              <span className="text-xs">Mansions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Listing Card 1 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Luxury villa"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Malibu, California</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.98</span>
              </div>
            </div>
            <p className="text-gray-500">Beach view</p>
            <p className="text-gray-500">Nov 12-17</p>
            <p>
              <span className="font-medium">$350</span> night
            </p>
          </div>

          {/* Listing Card 2 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Mountain cabin"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Aspen, Colorado</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.92</span>
              </div>
            </div>
            <p className="text-gray-500">Mountain view</p>
            <p className="text-gray-500">Dec 5-10</p>
            <p>
              <span className="font-medium">$275</span> night
            </p>
          </div>

          {/* Listing Card 3 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Desert retreat"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Sedona, Arizona</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.85</span>
              </div>
            </div>
            <p className="text-gray-500">Desert view</p>
            <p className="text-gray-500">Jan 15-20</p>
            <p>
              <span className="font-medium">$195</span> night
            </p>
          </div>

          {/* Listing Card 4 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Lakeside cottage"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Lake Tahoe, Nevada</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.97</span>
              </div>
            </div>
            <p className="text-gray-500">Lake view</p>
            <p className="text-gray-500">Feb 8-13</p>
            <p>
              <span className="font-medium">$225</span> night
            </p>
          </div>

          {/* Listing Card 5 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="City apartment"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">New York, New York</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.89</span>
              </div>
            </div>
            <p className="text-gray-500">City view</p>
            <p className="text-gray-500">Mar 3-8</p>
            <p>
              <span className="font-medium">$320</span> night
            </p>
          </div>

          {/* Listing Card 6 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Tropical villa"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Kauai, Hawaii</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.95</span>
              </div>
            </div>
            <p className="text-gray-500">Ocean view</p>
            <p className="text-gray-500">Apr 10-15</p>
            <p>
              <span className="font-medium">$400</span> night
            </p>
          </div>

          {/* Listing Card 7 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Countryside cottage"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Cotswolds, England</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.91</span>
              </div>
            </div>
            <p className="text-gray-500">Countryside</p>
            <p className="text-gray-500">May 20-25</p>
            <p>
              <span className="font-medium">$180</span> night
            </p>
          </div>

          {/* Listing Card 8 */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Mountain chalet"
                className="object-cover w-full h-full"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Chamonix, France</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.88</span>
              </div>
            </div>
            <p className="text-gray-500">Mountain view</p>
            <p className="text-gray-500">Jun 15-20</p>
            <p>
              <span className="font-medium">$250</span> night
            </p>
          </div>
        </div>

        {/* Show Map Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <Button className="rounded-full bg-gray-900 text-white px-4 py-3 shadow-lg">
            <span>Show map</span>
            <MapPin className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    AirCover
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Safety information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Supporting people with disabilities
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Cancellation options
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Disaster relief housing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Combating discrimination
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hosting</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Airbnb your home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    AirCover for Hosts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Hosting resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Community forum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Airbnb</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    New features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:underline">
                    Investors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-sm">© 2023 Airbnb, Inc.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-sm text-gray-600 hover:underline">
                  Privacy
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:underline">
                  Terms
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:underline">
                  Sitemap
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                <Link href="#" className="text-sm font-medium hover:underline">
                  English (US)
                </Link>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:underline">
                  $ USD
                </Link>
              </div>
              <div className="flex gap-4">
                <Link href="#" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

