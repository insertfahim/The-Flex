"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FlexHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#284E4C] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FWhite_V3%2520Symbol%2520%26%2520Wordmark.png&w=128&q=75"
                alt="The Flex"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-white hover:text-gray-200 transition-colors cursor-pointer">
              <span>Landlords</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Link href="/about" className="text-white hover:text-gray-200 transition-colors">
              About Us
            </Link>
            <Link href="/careers" className="text-white hover:text-gray-200 transition-colors">
              Careers
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
              Contact
            </Link>
            <div className="flex items-center space-x-4 text-white">
              <span className="text-sm">GB English</span>
              <span className="text-sm">£ GBP</span>
            </div>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 hover:bg-[#1e3a38]"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-[#1e3a38] py-4">
            <nav className="flex flex-col space-y-4">
              <div className="text-white hover:text-gray-200 transition-colors">Landlords</div>
              <Link href="/about" className="text-white hover:text-gray-200 transition-colors">
                About Us
              </Link>
              <Link href="/careers" className="text-white hover:text-gray-200 transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
