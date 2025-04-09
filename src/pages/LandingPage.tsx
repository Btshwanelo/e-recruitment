// LandingPage.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Flashlight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen w-full ">
      {/* Navigation Bar */}
      <header className="border-b border-gray-200 py-4 px-6 md:px-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-blue-500 font-bold text-xl flex items-center">
              <span className="text-cyan-500">CPR</span>
              <span className="text-gray-800">Loans</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-sm font-medium text-gray-700">
                Home
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 flex items-center">
                Products
                <span className="ml-1">▼</span>
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 flex items-center">
                Resources
                <span className="ml-1">▼</span>
              </a>
              <a href="#" className="text-sm font-medium text-gray-700">
                Pricing
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium">Theodore</div>
              <div className="text-xs text-gray-500">Theodore@example.com</div>
            </div>
            <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pb-12 relative md:pb-20 px-6 w-full md:px-20 ">
        <div className=" container absolute  opacity-20 px-6 w-full -z-50 pb-12 md:pb-20">
          <img src={'/images/bg-pattern.svg'} alt="Background" className="object-cover" />
        </div>
        <div className="container  px-16 mx-auto grid md:grid-cols-2 items-center pt-12 md:pt-20">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-900 leading-tight mb-4">
              Empower Your Practice:
              <br /> Apply for Loans with Ease
            </h1>
            <p className="text-lg text-[#475467]  font-normal mb-8">
              Leading Financial Solutions Tailored for
              <br /> Healthcare Professionals.
            </p>
            <Button
              className="bg-blue-500 w-full hover:bg-blue-600 text-white px-8 py-6 text-base rounded-md"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
          </div>
          <div className="relative">
            <img src="/images/landing-woman.png" alt="Healthcare professional" className="" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Why choose a CPR loan</h2>
          <p className="text-gray-600 mb-12">Manage your loan finances with clear upfront permissions here</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-md border border-[#E4E7EC] flex justify-center items-center mb-3">
                <Zap className="" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clear</h3>
              <p className="text-gray-600">We tell you everything you need to know before applying</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-md border border-[#E4E7EC] flex justify-center items-center mb-4">
                <Zap className="" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600">No hidden fees, just clear pricing and payment plans</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-md border border-[#E4E7EC] flex justify-center items-center mb-4">
                <Zap className="" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable</h3>
              <p className="text-gray-600">We'll make sure you have rates you can afford to pay</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="bg-white">
        <div className="container mx-auto py-32 px-16 md:px-20 bg-[#FAFAFA]">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 ">See how much your dream could cost</h2>
          <hr className="text-[#E4E7EC] mb-6" />

          <div className="grid md:grid-cols-2 gap-8 px-10">
            <div className="space-y-4 px-12">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price of the loan?</label>
                <Input placeholder="R 0" className="border-gray-300" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate?</label>
                <Input placeholder="0%" className="border-gray-300" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit (optional)?</label>
                <Input placeholder="R 0" className="border-gray-300" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment term (years)?</label>
                <Input placeholder="R 0" className="border-gray-300" />
              </div>
            </div>

            <div>
              <Card className="bg-[#FEF0C7] border-none shadow-sm px-7">
                <CardContent className="pt-2 gap-4">
                  <div className="flex justify-center">
                    <div className=" p-4 rounded-lg">
                      <img src="/images/bank-note.svg" alt="Calculator icon" />
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-600">Loan requested amount</p>
                    <p className="text-2xl font-bold">R 1 500 000</p>
                  </div>

                  <div className="text-center mb-8">
                    <p className="text-sm font-medium text-gray-600">Estimated monthly repayment will be</p>
                    <p className="text-3xl font-bold text-blue-800">R 20 000</p>
                    <p className="text-xs text-gray-500">View breakdown</p>
                  </div>
                  <hr className="text-[#667085] mb-6" />

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="text-sm bg-white text-[#DC6803] font-semibold border border-[#F79009]">
                      Get pre-qualified
                    </Button>
                    <Button className="bg-[#58B6E9] hover:bg-blue-400 text-white text-sm">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-6 container mx-auto">
          Our calculation is only an example of how the interest rate and fees can affect your repayments. Although we do our best to give
          you accurate calculations, they will not be binding on us.Disclaimer: We provide this calculator for convenience to you to provide
          results based on your input and assumptions and it should not be used for any other purpose. We give no warranty, express or
          implied, as to the accuracy, reliability and completeness of any information, formulae or calculations provided through its use.
          We do not accept any liability for loss or damage of any nature, including indirect or consequential loss, which may be
          attributable to the reliance on and use of the calculators. Please contact us for verification on any of the information provided.
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <div className="w-full flex justify-center mb-6">
            <div className="w-14 h-14 rounded-md border border-[#E4E7EC] flex justify-center items-center">
              <Zap className="" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">Why take out a loan with us?</h2>

          <div className="grid md:grid-cols-3 gap-8 bg-[#F9FAFB] p-9">
            <div className="border-l-3 border-[#0086C9] p-6 ">
              <div className="mb-2">
                <span className="text-5xl font-semibold text-[#0086C9]">40+</span>
              </div>
              <p className="text-gray-900 font-semibold mb-2">New practices built in the last year</p>
              <a href="#" className="text-[#0086C9] text-sm font-semibold flex items-center">
                View projects
                <ArrowRight className="ml-1 h-4 w-4 text-[#0086C9]" />
              </a>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="mb-2">
                <span className="text-4xl font-bold text-blue-600">600%</span>
              </div>
              <p className="text-gray-600 mb-2">Return on investment</p>
              <a href="#" className="text-blue-500 text-sm font-semibold flex items-center">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="mb-2">
                <span className="text-4xl font-bold text-blue-600">5%</span>
              </div>
              <p className="text-gray-600 mb-2">Fixed interest rate</p>
              <a href="#" className="text-blue-500 text-sm font-medium flex items-center">
                Download now
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <div className="bg-[#FEC84B] rounded-lg  p-16 text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Ready to apply?</h2>
            <Button className="bg-[#58B6E9] text-white hover:bg-gray-100">Get Started</Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">To apply for your loan online</h2>

          <div className="grid md:grid-cols-3 gap-8 bg-[#F9FAFB] p-8">
            <div className="text-left">
              <div className="text-6xl font-semibold text-[#0086C9] mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Complete the form</h3>
              <p className="text-gray-600">Fill in all required information to apply online, on this website</p>
            </div>

            <div className="text-left">
              <div className="text-6xl font-semibold text-[#0086C9] mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Consent and verify</h3>
              <p className="text-gray-600">We'll run basic security checks once you tell us. All actions you can might need</p>
            </div>

            <div className="text-left">
              <div className="text-6xl font-semibold text-[#0086C9] mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Accept the loan</h3>
              <p className="text-gray-600">
                Once approved, you'll pay the initial fee and we'll deposit the money into your account. At last
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Learn more about our loans</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <Card className="border-none rounded-none shadow-none">
              <img src="https://placehold.co/600x400" alt="Blog image" className="w-full  object-cover" />
              <CardContent className="pt-1 px-1">
                <h3 className="text-lg font-semibold mb-2">Why CPR is the best for you?</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn what sets us apart from other financial loans, and why we're making a difference.
                </p>
                <a href="#" className="text-[#065986] text-sm font-semibold">
                  Read post →
                </a>
              </CardContent>
            </Card>

            {/* Blog Card 2 */}
            <Card className="border-none rounded-none shadow-none">
              <img src="https://placehold.co/600x400" alt="Blog image" className="w-full  object-cover" />
              <CardContent className="pt-1 px-1">
                <h3 className="text-lg font-semibold mb-2">How a tailor-made to your specific needs</h3>
                <p className="text-gray-600 text-sm mb-3">We'll create the perfect customized loan for your healthcare practice.</p>
                <a href="#" className="text-[#065986] text-sm font-semibold">
                  Read post →
                </a>
              </CardContent>
            </Card>

            {/* Blog Card 3 */}
            <Card className="border-none rounded-none shadow-none">
              <img src="https://placehold.co/600x400" alt="Blog image" className="w-full  object-cover" />
              <CardContent className="pt-1 px-1">
                <h3 className="text-lg font-semibold mb-2">Building your API</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn how your practice can connect directly to our systems, making it simpler to manage and track loans.
                </p>
                <a href="#" className="text-[#065986] text-sm font-semibold">
                  Read post →
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-start space-x-2 mt-8">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-[#E4E7EC]">
              <ChevronLeft className="h-5 w-5 text-[#667085]" />
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-[#E4E7EC]">
              <ChevronRight className="h-5 w-5 text-[#667085]" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-6 md:px-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Join our newsletter</h3>
              <p className="text-gray-600 text-sm">Stay informed with tips from our team. No spam.</p>
            </div>

            <div className="flex w-full md:w-auto gap-1">
              <Input placeholder="Enter your email" className="border border-[#D0D5DD]" />
              <Button className="bg-[#58B6E9] text-white hover:bg-blue-600 ">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-20 bg-white border-t border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-7 gap-8">
            {/* Column 1 */}
            <div className="col-span-2">
              <div className="text-blue-500 font-bold text-xl flex items-center mb-4">
                <span className="text-cyan-500">CPR</span>
                <span className="text-gray-800">Loans</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Design amazing digital experiences that create more happy users in the world.</p>
              <div className=" p-2 inline-block rounded-lg mb-4">
                <img src="/images/Ratings-badge.svg" alt="Award badge" />
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Overview</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Solutions</a>
                </li>
                <li>
                  <a href="#">Tutorials</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Releases</a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Media kit</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Newsletter</a>
                </li>
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">Help centre</a>
                </li>
                <li>
                  <a href="#">Tutorials</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="#">AngelList</a>
                </li>
                <li>
                  <a href="#">Dribbble</a>
                </li>
              </ul>
            </div>

            {/* Column 6 */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Cookies</a>
                </li>
                <li>
                  <a href="#">Licenses</a>
                </li>
                <li>
                  <a href="#">Settings</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">© 2024 CPR MED LTD, All rights reserved.</p>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <img src="/images/x-icon.svg" alt="Twitter icon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <img src="/images/facebook-icon.svg" alt="LinkedIn icon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <img src="/images/linked-icon.svg" alt="Facebook icon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <img src="/images/linked-icon.svg" alt="GitHub icon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Dribbble</span>
                <img src="/images/linked-icon.svg" alt="Dribbble icon" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
