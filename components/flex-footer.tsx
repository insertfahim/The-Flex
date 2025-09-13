import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function FlexFooter() {
  return (
    <footer className="bg-[#284E4C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Join The Flex</h3>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="First name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                />
                <Input
                  placeholder="Last name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                />
              </div>
              <Input
                placeholder="Email address"
                type="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <div className="flex">
                <select className="bg-white/10 border border-white/20 rounded-l-md px-3 py-2 text-white text-sm">
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <Input
                  placeholder="Phone number"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 rounded-l-none border-l-0"
                />
              </div>
              <Button className="w-full bg-white text-[#284E4C] hover:bg-gray-100 font-semibold">✈️ Subscribe</Button>
            </div>
          </div>

          {/* The Flex */}
          <div>
            <h3 className="text-lg font-semibold mb-4">The Flex</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Professional property management services for landlords, flexible corporate lets for businesses and
              quality accommodations for short-term and long-term guests.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-200 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-200 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-200 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-200 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li className="text-gray-200">LONDON</li>
              <li className="text-gray-200">PARIS</li>
              <li className="text-gray-200">ALGIERS</li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-gray-200">📞 Support Numbers</div>
                <div className="text-gray-200">🇬🇧 United Kingdom</div>
                <div className="text-white">+44 77 2374 5646</div>
              </div>
              <div>
                <div className="text-gray-200">🇩🇿 Algeria</div>
                <div className="text-white">+33 7 57 59 22 41</div>
              </div>
              <div>
                <div className="text-gray-200">🇫🇷 France</div>
                <div className="text-white">+33 6 44 64 57 17</div>
              </div>
              <div className="mt-3">
                <div className="text-white">📧 info@theflex.global</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-gray-200 text-sm">© 2025 The Flex. All rights reserved.</p>
        </div>
      </div>

      {/* WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
          <div className="w-6 h-6 flex items-center justify-center">💬</div>
        </div>
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 p-3 rounded-lg shadow-lg max-w-xs">
          <div className="text-sm font-semibold mb-1">Have any questions? Let's chat! 😊</div>
          <div className="text-xs text-gray-600">Click here to start a conversation</div>
        </div>
      </div>
    </footer>
  )
}
