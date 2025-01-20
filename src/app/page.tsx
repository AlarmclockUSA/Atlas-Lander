'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // Base transform values
  const baseTransform = {
    back: {
      rotateX: 8,
      rotateY: 4,
      scale: 0.95,
      translateY: -5
    },
    front: {
      rotateX: 8,
      rotateY: 4,
      scale: 0.85,
      translateY: 12,
      translateX: 8
    }
  };

  // Calculate dynamic transform values based on mouse position and hover state
  const getTransform = (isBack: boolean) => {
    const base = isBack ? baseTransform.back : baseTransform.front;
    
    if (!isHovering) return `
      perspective(2000px)
      rotateX(${base.rotateX}deg)
      rotateY(${base.rotateY}deg)
      ${isBack ? '' : 'translateX(' + base.translateX + '%)'}
      translateY(${base.translateY}%)
      scale(${base.scale})
    `;

    // More subtle rightward shift for front card on hover
    const hoverTranslateX = isBack ? 0 : 2;
    // Minimal mouse movement sensitivity
    const rotateXDelta = (mousePosition.y - 0.5) * 2;
    const rotateYDelta = (mousePosition.x - 0.5) * 2;

    return `
      perspective(2000px)
      rotateX(${base.rotateX + rotateXDelta}deg)
      rotateY(${base.rotateY + rotateYDelta}deg)
      translateX(${(isBack ? 0 : base.translateX + hoverTranslateX)}%)
      translateY(${base.translateY}%)
      scale(${base.scale})
    `;
  };

  // Animation loop for hover effect
  useEffect(() => {
    if (!isHovering) return;
    
    const animate = () => {
      setMousePosition(prev => ({ ...prev, timestamp: Date.now() }));
      animationFrame = requestAnimationFrame(animate);
    };
    
    let animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovering]);

  const propertyImages = [
    "/properties/bob-house Medium.jpeg",
    "/properties/frank-house Medium.jpeg",
    "/properties/Douglas-house.webp",
    "/properties/Linda-house Medium.jpeg",
    "/properties/james-house Medium.jpeg",
    "/properties/Michael-house.webp"
  ];

  const profilePictures = [
    "/properties/bob-avatar Medium.jpeg",
    "/properties/Frank-avatar Medium.jpeg",
    "/properties/douglas-avatar Medium.jpeg",
    "/properties/Linda-avatar Medium.jpeg",
    "/properties/James-avatar Medium.jpeg",
    "/properties/Michael-Avatar.webp"
  ];

  const properties = [
    {
      name: "Bob Eastman",
      address: "2847 Maple Grove Drive, Plainfield, IL 60544",
      description: "The four-bedroom Colonial on Maple Grove Drive",
      image: propertyImages[1],
      avatar: profilePictures[0]
    },
    {
      name: "Frank Reeves",
      address: "1847 Cedar Street, Pittsburgh, PA 15212",
      description: "Owner of a historic brick Tudor in Manchester, Pittsburgh",
      image: propertyImages[0],
      avatar: profilePictures[1]
    },
    {
      name: "Michael Harrison",
      address: "3847 Brookside Drive Rochester Hills, MI 48309",
      description: "Lawyer - Inherited Family Property",
      image: propertyImages[5],
      avatar: profilePictures[5]
    },
    {
      name: "Linda Martinez",
      address: "8847 Mockingbird Lane, Dallas, TX 75238",
      description: "The Dallas School Teacher Who Talks \"Way\" Too Much.",
      image: propertyImages[3],
      avatar: profilePictures[3]
    },
    {
      name: "Douglas Warner",
      address: "3847 Elmwood Avenue, Naperville, IL 60540",
      description: "Ready-to-Sell, but on his terms.",
      image: propertyImages[2],
      avatar: profilePictures[2]
    },
    {
      name: "James Wilson",
      address: "4572 Sycamore Lane, Riverside, CA 92506",
      description: "Retired teacher considering downsizing",
      image: propertyImages[4],
      avatar: profilePictures[4]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0C1B] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0C1B] border-b border-white/10">
        <div className="max-w-[85rem] mx-auto px-4 md:px-6 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0 w-24">
              <div className="text-xl font-bold">ATLAS</div>
            </div>

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex flex-grow items-center justify-center">
              <div className="flex items-center space-x-12">
                <a href="#sellers" className="text-gray-300 hover:text-white transition-colors">Sellers</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
                <a href="#research" className="text-gray-300 hover:text-white transition-colors">Research</a>
                <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
                <a href="#final-cta-section" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex items-center space-x-6">
              <a href="https://login.atlastraining.io" className="text-gray-300 hover:text-white transition-colors">Sign in</a>
              <a href="https://secure.atlastraining.io" className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] px-6 py-3 rounded-lg text-[1rem] font-medium transition-all">
                Try Now Free
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="dashboard" className="relative pt-32 pb-40 px-4 md:px-6 text-[87.5%]">
        <div className="max-w-[85rem] mx-auto text-center">
          <div className="inline-flex items-center bg-white/5 rounded-full px-4 py-2 mb-[2rem] border border-white/10">
            <span className="text-[0.9rem] font-medium text-[#22C55E] mr-2">INTRODUCING</span>
            <span className="text-[1.1rem] leading-[1.618] text-gray-300">The Next Generation of Sales Training →</span>
          </div>
          <div className="text-[1rem] tracking-[0.1em] text-[#22C55E] font-medium mb-4">
            GET STARTED FREE TODAY
          </div>
          <h1 className="text-[3.2rem] md:text-[4.8rem] font-bold mb-[2rem] leading-[1.272]">
            Permanently Amplify Your<br />
            REI Sales and Negotiation Skills
          </h1>
          <p className="text-[1.2rem] text-gray-400 mb-12 max-w-[61.8%] mx-auto leading-[1.618]">
            Stop Losing Deals You Should Have Won With This AI-Powered Training System That Uses Neuroscience to permanently amplify your Sales and Negotiation Skills—So You Never Miss a Closable Deal Again
          </p>
          <div className="flex justify-center">
            <a href="https://secure.atlastraining.io" className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] px-6 py-3 rounded-lg text-[1rem] font-medium transition-all">
              Try Now Free
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div 
          className="max-w-6xl mx-auto mt-20 relative h-[600px]" 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Green gradient circle */}
          <div className="gradient-circle"></div>

          {/* Background screenshot - Property Grid */}
          <div 
            className="absolute inset-0 bg-[#0D1025] rounded-xl shadow-2xl transform perspective-1000 hover:scale-[1.02] transition-all duration-300 animated-border"
            style={{
              transform: getTransform(true),
              zIndex: 10,
              transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
            }}
          >
            <div className="bg-[#0D1025] rounded-xl h-full border border-white/[0.08] relative z-[1]">
              <div className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Hello, Matt!</h2>
                    <p className="text-gray-400">Click any seller to get started</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="bg-[#22C55E] p-2 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {properties.map((property, index) => (
                    <div key={index} className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                      <div className="h-40 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1025] to-transparent z-10" />
          <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <Image
                            src={property.avatar}
                            alt={property.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold text-sm">{property.name}</h3>
                            <p className="text-xs text-gray-400">{property.address}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 italic">{property.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Foreground screenshot - Property Details */}
          <div 
            className="absolute inset-0 bg-[#0D1025] rounded-xl shadow-2xl transform perspective-1000 hover:scale-[1.02] transition-all duration-300 green-glow-shadow"
            style={{
              transform: getTransform(false),
              zIndex: 20,
              transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
            }}
          >
            <div className="bg-[#0D1025] rounded-xl overflow-hidden h-full border border-white/[0.08]">
              {/* Property Image */}
              <div className="w-full h-48 relative">
          <Image
                  src="/rebecca-property.png"
                  alt="Rebecca Mitchell's Property"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
          <Image
                      src="/rebecca-avata.png"
                      alt="Rebecca Mitchell"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">Rebecca Mitchell</div>
                      <div className="text-sm text-gray-400 italic">The Dallas School Teacher Who Talks "Way" Too Much.</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      Start Call
                    </button>
                    <button className="text-white px-4 py-2 rounded-lg text-sm border border-gray-600">
                      End Call
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#141832] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Property Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-gray-400">Address</div>
                        <div className="font-semibold">8847 Mockingbird Lane</div>
                        <div className="text-sm text-gray-400">Dallas, TX 75238</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Neighborhood</div>
                        <div className="font-semibold">Lake Highlands</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Built</div>
                        <div className="font-semibold">1968</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Style</div>
                        <div className="font-semibold">Traditional Ranch</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#141832] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Comparable Properties</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">8832 Mockingbird Lane</div>
                          <div className="text-sm text-gray-400">Condition: Updated</div>
                        </div>
                        <div className="text-[#22C55E] font-semibold">$282,000</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">8915 Easton Road</div>
                          <div className="text-sm text-gray-400">Condition: Original</div>
                        </div>
                        <div className="text-[#22C55E] font-semibold">$285,000</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">8756 Lanshire Drive</div>
                          <div className="text-sm text-gray-400">Condition: Partially Updated</div>
                        </div>
                        <div className="text-[#22C55E] font-semibold">$289,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Section */}
        <section id="sellers" className="max-w-[85rem] mx-auto mt-32 mb-24">
          <div className="flex flex-col items-center px-4 md:px-6">
            {/* Text Content */}
            <div className="text-center mb-16 max-w-[61.8%]">
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6 leading-[1.2]">
                Breathtakingly Realistic<br />
                <span className="text-[#22C55E]">Seller Simulations</span>
              </h2>
              <p className="text-[1.2rem] text-gray-400 leading-[1.618]">
                Our AI sellers are trained on thousands of real conversations, objections, and personality types. Practice with sellers who feel real, respond naturally, and test your skills.
              </p>
            </div>

            {/* Photo Grid */}
            <div className="w-full max-w-[61.8%]">
              <div className="grid grid-cols-3 gap-4">
                {/* Frank Reeves */}
                <div className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                  <div className="aspect-video relative">
                    <Image
                      src={propertyImages[0]}
                      alt="Tudor House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={properties[0].avatar}
                        alt={properties[0].name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{properties[0].name}</h3>
                        <p className="text-xs text-gray-400">{properties[0].address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">{properties[0].description}</p>
                  </div>
                </div>

                {/* Bob Eastman */}
                <div className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                  <div className="aspect-video relative">
                    <Image
                      src={propertyImages[1]}
                      alt="Colonial House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={properties[1].avatar}
                        alt={properties[1].name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{properties[1].name}</h3>
                        <p className="text-xs text-gray-400">{properties[1].address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">{properties[1].description}</p>
                  </div>
                </div>

                {/* Michael Harrison */}
                <div className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                  <div className="aspect-video relative">
                    <Image
                      src={propertyImages[5]}
                      alt="Snow House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={properties[2].avatar}
                        alt={properties[2].name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{properties[2].name}</h3>
                        <p className="text-xs text-gray-400">{properties[2].address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">{properties[2].description}</p>
                  </div>
                </div>

                {/* Rebecca Mitchell */}
                <div className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                  <div className="aspect-video relative">
                    <Image
                      src={propertyImages[3]}
                      alt="Ranch House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={properties[3].avatar}
                        alt={properties[3].name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{properties[3].name}</h3>
                        <p className="text-xs text-gray-400">{properties[3].address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">{properties[3].description}</p>
                  </div>
                </div>

                {/* Douglas Warner */}
                <div className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                  <div className="aspect-video relative">
                    <Image
                      src={propertyImages[2]}
                      alt="Tudor Snow House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={properties[4].avatar}
                        alt={properties[4].name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{properties[4].name}</h3>
                        <p className="text-xs text-gray-400">{properties[4].address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">{properties[4].description}</p>
                  </div>
                </div>

                {/* James Wilson */}
                <div className="bg-[#141832] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#22C55E] transition-all">
                  <div className="aspect-video relative">
                    <Image
                      src={propertyImages[4]}
                      alt="Palm House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={properties[5].avatar}
                        alt={properties[5].name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{properties[5].name}</h3>
                        <p className="text-xs text-gray-400">{properties[5].address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">{properties[5].description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-16 text-center">
              <a href="https://secure.atlastraining.io" className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] px-[2rem] py-[1.2rem] rounded-lg text-[1.2rem] font-medium transition-all">
                Start Training Now
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-[85rem] mx-auto mt-24 mb-24">
          <div className="flex flex-col px-4 md:px-6">
            <div className="max-w-[61.8%] mx-auto">
              <blockquote className="text-left text-[2.8rem] md:text-[3.6rem] font-bold leading-[1.272]">
                "With Atlas, I don't have to feel the fear<br />
                of messing up or the weight of<br />
                judgment.<br />
                I can finally practice, get<br />
                better, and step<br />
                into real conversations feeling<br />
                <span className="text-[#22C55E]">prepared and confident.</span>"
              </blockquote>
              <p className="mt-6 text-gray-400 text-[1.1rem] leading-[1.618]">— Atlas Founding Member</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 px-4 md:px-6 relative overflow-visible">
          <div className="max-w-[85rem] mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left Column - Text */}
              <div>
                <div className="inline-flex items-center bg-white/5 rounded-full px-4 py-2 mb-8 border border-white/10">
                  <span className="text-[0.9rem] font-medium text-[#22C55E] mr-2">Powered By</span>
                  <span className="text-[1.1rem] text-gray-300">Deep Reality Protocol™</span>
                </div>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold leading-[1.2] mb-8">
                  Neuroscience-Driven<br />
                  <span className="text-[#22C55E]">Training System</span><br />
                  for Real Results
                </h2>
                <p className="text-[1.2rem] leading-[1.618] text-gray-400">
                  Built on advancements in neuroscience and cognitive behavioral training,<br />
                  our <span className="text-white">three pillars of Deep Reality Protocol</span> create lasting behavioral change
                </p>
              </div>

              {/* Right Column - Icons */}
              <div className="relative">
                {/* Green glow effect */}
                <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22C55E]/10 blur-[120px] rounded-full"></div>
                
                {/* Icons container */}
                <div className="relative grid grid-cols-3 gap-8 items-center">
                  {/* Left Icon */}
                  <div className="group w-28 h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center transform hover:scale-105 transition-all hover:border-[#22C55E]/20">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Cognitive</span>
                  </div>
                  
                  {/* Center Icon (larger) */}
                  <div className="group w-36 h-36 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center transform hover:scale-105 transition-all hover:border-[#22C55E]/20">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] mb-2 group-hover:scale-110 transition-transform flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Neural</span>
                  </div>
                  
                  {/* Right Icon */}
                  <div className="group w-28 h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center transform hover:scale-105 transition-all hover:border-[#22C55E]/20">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Behavioral</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Pillars Description */}
            <div className="grid lg:grid-cols-3 gap-8 mt-16">
              {/* Cognitive Pillar */}
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Cognitive Enhancement</h3>
                </div>
                <p className="text-gray-400 leading-[1.618]">
                  Build confidence and conviction through repeated exposure to real-time problem-solving scenarios. Learn to create emotional connections and handle unexpected situations naturally, developing the mental agility needed for successful negotiations.
                </p>
              </div>

              {/* Neural Pillar */}
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Neural Adaptation</h3>
                </div>
                <p className="text-gray-400 leading-[1.618]">
                  Instead of pretending or "practicing," you'll engage in deep reality-based scenarios. Build muscle memory through emotional investment, creating lasting neural pathways that transform how you naturally respond in real-world situations.
                </p>
              </div>

              {/* Behavioral Pillar */}
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Behavioral Integration</h3>
                </div>
                <p className="text-gray-400 leading-[1.618]">
                  Experience genuine reactions and emotions, face real fears, and encounter actual objections. Develop authentic responses versus scripted answers across millions of possible scenarios, ensuring you're prepared for any situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-32 px-4 md:px-6 bg-[#0A0C1B]">
          <div className="max-w-[85rem] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-[6.472rem]">
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-[2.618rem] leading-[1.2]">
                Inspired by Military Grade<br />
                <span className="text-[#22C55E]">Training Methodology</span>
              </h2>
              <div className="text-[1rem] tracking-[0.1em] text-[#22C55E] font-medium mb-[1.618rem]">BACKED BY LANDMARK RESEARCH</div>
              <p className="text-[1.2rem] text-white/90 max-w-[61.8%] mx-auto leading-[1.618]">
                A meta-analysis of 247 military studies and leading medical institutions reveals why DRP's training methodology creates exceptional performers:
              </p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-[61.8%] mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-[28px] top-[60px] bottom-8 w-[2px] bg-gradient-to-b from-[#22C55E]/50 to-transparent"></div>

              {/* Timeline Items */}
              <div className="space-y-[6.472rem]">
                {/* Item 1 */}
                <div className="relative flex min-h-[280px] group">
                  {/* Icon */}
                  <div className="absolute left-0 w-[58px] h-[58px] rounded-2xl bg-[#0D1025] border border-white/[0.08] flex items-center justify-center group-hover:border-[#22C55E]/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-24 pt-2">
                    <h3 className="text-[1.8rem] font-bold text-white mb-[1.618rem] leading-[1.2]">VERIFIED PERFORMANCE IMPROVEMENT</h3>
                    <p className="text-[1.2rem] text-gray-400 mb-[2.618rem] leading-[1.618] max-w-[90%]">
                      Military research proves simulation training improves real-world execution by <span className="text-[#22C55E] font-semibold">45%</span> compared to traditional methods. Think about that - nearly half again better at executing when it matters most.
                    </p>
                    <div className="flex items-center justify-between mb-[1.618rem] max-w-[90%]">
                      <div className="text-[1rem] text-gray-500 italic leading-[1.618]">
                        Study: Flight Simulator Training Effectiveness, Military Psychology - Meta-analysis of 247 studies
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative flex min-h-[280px] group">
                  {/* Icon */}
                  <div className="absolute left-0 w-[58px] h-[58px] rounded-2xl bg-[#0D1025] border border-white/[0.08] flex items-center justify-center group-hover:border-[#22C55E]/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-24 pt-2">
                    <h3 className="text-[1.8rem] font-bold text-white mb-[1.618rem] leading-[1.2]">PROVEN DECISION-MAKING MASTERY</h3>
                    <p className="text-[1.2rem] text-gray-400 mb-[2.618rem] leading-[1.618] max-w-[90%]">
                      Under extreme pressure, simulation-trained professionals achieve <span className="text-[#22C55E] font-semibold">71%</span> higher accuracy in critical decision-making. When you're negotiating six and seven-figure deals, this is the difference between good and exceptional.
                    </p>
                    <div className="flex items-center justify-between mb-[1.618rem] max-w-[90%]">
                      <div className="text-[1rem] text-gray-500 italic leading-[1.618]">
                        Study: Flight Simulator Training Effectiveness, Military Psychology
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative flex min-h-[280px] group">
                  {/* Icon */}
                  <div className="absolute left-0 w-[58px] h-[58px] rounded-2xl bg-[#0D1025] border border-white/[0.08] flex items-center justify-center group-hover:border-[#22C55E]/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E]/80 to-[#16A34A]/80 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-24 pt-2">
                    <h3 className="text-[1.8rem] font-bold text-white mb-[1.618rem] leading-[1.2]">ACCELERATED SKILL RETENTION</h3>
                    <p className="text-[1.2rem] text-gray-400 mb-[2.618rem] leading-[1.618] max-w-[90%]">
                      Medical research demonstrates a <span className="text-[#22C55E] font-semibold">55%</span> improvement in knowledge retention through simulation training compared to conventional methods. Your skills don't just improve temporarily - they become permanently integrated.
                    </p>
                    <div className="flex items-center justify-between mb-[1.618rem] max-w-[90%]">
                      <div className="text-[1rem] text-gray-500 italic leading-[1.618]">
                        Study: Effectiveness of simulation-based nursing education, NCBI
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="mt-24 max-w-[61.8%] mx-auto relative">
          <div className="bg-[#0D1025] rounded-xl p-12 border border-white/[0.08] relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/10 via-transparent to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-[2rem] font-bold mb-6 leading-[1.2] text-center">
                Ready to Experience the <span className="text-[#22C55E]">Next Generation</span><br />
                of Sales Training?
              </h3>
              <p className="text-[1.2rem] text-gray-400 mb-8 leading-[1.618] text-center">
                Join the ranks of top performers who have transformed their sales approach through our advanced AI training system.
              </p>
              <div className="flex items-center justify-center">
                <a href="https://secure.atlastraining.io" className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] px-[2rem] py-[1.2rem] rounded-lg text-[1.2rem] font-medium transition-all">
                  Start Training Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section id="benefits" className="py-32 px-4 md:px-6">
          <div className="max-w-[85rem] mx-auto text-center">
            <div className="text-[#22C55E] font-medium mb-4">AI DRIVEN SELLER SCENARIOS</div>
            <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-8 leading-[1.2]">
              Empower yourself to do<br />
              <span className="text-[#22C55E]">more real estate deals</span>
            </h2>
            <p className="text-[1.2rem] leading-[1.618] mb-16 max-w-[61.8%] mx-auto">
              After Analyzing 10,000+ Seller Conversation and identifying the communication patterns that make top investors close 80% more deals than average - our Deep Realty Protocol has helped training over 100+ real estate investors and now we are teaching these patterns through AI seller simulations and neural retraining.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Converting More Deals */}
              <div className="bg-[#0D1025] rounded-xl p-8 text-left border border-white/[0.08] hover:border-[#22C55E]/20 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#141832] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Converting <span className="text-[#22C55E]">More Deals</span></h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Build confidence that comes through in your calls</li>
                  <li>• Handle tough objections smoothly because you've faced them before</li>
                  <li>• Get the reps in before you speak to a real seller</li>
                  <li>• Turn around challenging situations that would've killed deals before</li>
                </ul>
              </div>

              {/* Better Deal Negotiations */}
              <div className="bg-[#0D1025] rounded-xl p-8 text-left border border-white/[0.08] hover:border-[#22C55E]/20 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#141832] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Better Deal <span className="text-[#22C55E]">Negotiations</span></h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Stay calm when sellers test your limits</li>
                  <li>• Handle price discussions without getting flustered</li>
                  <li>• Navigate emotional sellers with genuine confidence</li>
                  <li>• Keep conversations on track even when they get heated</li>
                </ul>
              </div>

              {/* Faster Learning Curve */}
              <div className="bg-[#0D1025] rounded-xl p-8 text-left border border-white/[0.08] hover:border-[#22C55E]/20 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#141832] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Faster Learning <span className="text-[#22C55E]">Curve</span></h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Compress months of learning into focused training</li>
                  <li>• Learn from mistakes without losing real deals</li>
                  <li>• Master common scenarios before you face them live</li>
                  <li>• Build skills faster than "learning on the job"</li>
                </ul>
              </div>

              {/* Higher Quality Conversations */}
              <div className="bg-[#0D1025] rounded-xl p-8 text-left border border-white/[0.08] hover:border-[#22C55E]/20 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#141832] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Higher Quality <span className="text-[#22C55E]">Conversations</span></h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Build genuine rapport that sellers respond to</li>
                  <li>• Read between the lines of what sellers are saying</li>
                  <li>• Ask better questions that get to the heart of the deal</li>
                  <li>• Handle emotional situations with real empathy</li>
                </ul>
              </div>

              {/* More Consistent Performance */}
              <div className="bg-[#0D1025] rounded-xl p-8 text-left border border-white/[0.08] hover:border-[#22C55E]/20 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#141832] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">More Consistent <span className="text-[#22C55E]">Performance</span></h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Get the same results whether you're feeling great or stressed</li>
                  <li>• Handle calls confidently even on your worst days</li>
                  <li>• Maintain composure during tough conversations</li>
                  <li>• Deliver your message clearly every time</li>
                </ul>
              </div>

              {/* Better Results */}
              <div className="bg-[#0D1025] rounded-xl p-8 text-left border border-white/[0.08] hover:border-[#22C55E]/20 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#141832] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Better <span className="text-[#22C55E]">Results</span></h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Close more deals with less effort</li>
                  <li>• Get better prices through skilled negotiation</li>
                  <li>• Amplify your Sales and Negotiation Skills</li>
                  <li>• Create a sustainable, growing business</li>
                </ul>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-16">
              <a href="https://secure.atlastraining.io" className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] px-[2rem] py-[1.2rem] rounded-lg text-[1.2rem] font-medium transition-all">
                Start Training Now
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="final-cta-section" className="relative pt-0 pb-40 px-4 md:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D1B] via-[#0A0D1B] to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_0%_100%,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_100%_100%,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
          </div>
          <div className="max-w-[85rem] mx-auto relative">
            <div className="text-center">
              <div className="flex flex-col items-center mb-12 space-y-4">
                <div className="text-[1rem] tracking-[0.1em] text-[#22C55E] font-medium mb-4">
                  AI DRIVEN SELLER SCENARIOS
                </div>
                <h2 className="text-[3.6rem] md:text-[4.8rem] font-bold mb-6 leading-[1.2]">
                  Permanently Amplify<br />
                  Your Sales And Negotiation Skills
                </h2>
                <div className="text-[1rem] tracking-[0.1em] text-[#22C55E] font-medium mb-4">
                  GET STARTED FREE TODAY
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-3 border-b border-white/10 hover:border-[#22C55E]/50 group transition-all">
                  <span className="text-[1.1rem] text-white group-hover:text-[#22C55E] transition-colors">1-on-1 AI Sales Simulation with deeply authentic property owners</span>
                  <span className="text-[1.1rem] text-[#22C55E]">$897/mo value</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-3 border-b border-white/10 hover:border-[#22C55E]/50 group transition-all">
                  <span className="text-[1.1rem] text-white group-hover:text-[#22C55E] transition-colors">Personal AI Sales coach available 24/7</span>
                  <span className="text-[1.1rem] text-[#22C55E]">$499/mo value</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-3 border-b border-white/10 hover:border-[#22C55E]/50 group transition-all">
                  <span className="text-[1.1rem] text-white group-hover:text-[#22C55E] transition-colors">Millions of Sellers scenario possibilities</span>
                  <span className="text-[1.1rem] text-[#22C55E]">$399/mo value</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-3 border-b border-white/10 hover:border-[#22C55E]/50 group transition-all">
                  <span className="text-[1.1rem] text-white group-hover:text-[#22C55E] transition-colors">Deep Reality Protocol Driven Feedback and growth Dashboard</span>
                  <span className="text-[1.1rem] text-[#22C55E]">$399/mo value</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-3 border-b border-white/10 hover:border-[#22C55E]/50 group transition-all">
                  <span className="text-[1.1rem] text-white group-hover:text-[#22C55E] transition-colors">Direct Feedback post call to review</span>
                  <span className="text-[1.1rem] text-[#22C55E]">$299/mo value</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-3 border-b border-white/10 hover:border-[#22C55E]/50 group transition-all">
                  <span className="text-[1.1rem] text-white group-hover:text-[#22C55E] transition-colors">10hrs of conversation time with AI Sellers</span>
                  <span className="text-[1.1rem] text-[#22C55E]">$399/mo value</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-4 mt-2">
                  <span className="text-[1.2rem] font-medium text-white">Total Value</span>
                  <span className="text-[1.2rem] font-medium text-[#22C55E]">$2,892/mo</span>
                </div>
                <div className="flex items-center justify-between w-full max-w-[61.8%] py-4 bg-[#22C55E]/10 rounded-lg px-4">
                  <span className="text-[1.2rem] font-medium text-white">Your Investment</span>
                  <span className="text-[1.2rem] font-medium text-[#22C55E]">$299/mo</span>
                </div>
              </div>
              <p className="text-[1.2rem] text-gray-400 mb-12 max-w-[61.8%] mx-auto leading-[1.618]">
                Our team is ready to help you step into the future of real estate sales. Book a demo today
                to see how our AI training can completely transform your business.
              </p>
              <div className="flex items-center justify-center">
                <a href="https://secure.atlastraining.io" className="inline-flex items-center bg-[#22C55E] hover:bg-[#16A34A] px-8 py-4 rounded-lg text-[1.1rem] font-medium transition-all">
                  Start Training Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>

      <footer className="bg-[#0A0C1B] text-white py-12">
        <div className="max-w-[85rem] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and Info */}
            <div>
              <div className="text-2xl font-bold mb-4">ATLAS</div>
              <p className="text-gray-400 text-base leading-relaxed">
                Transforming real estate professionals through AI-powered training and deep reality simulations.
              </p>
            </div>
            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#sellers" className="hover:underline text-gray-300">Sellers</a></li>
                <li><a href="#how-it-works" className="hover:underline text-gray-300">How it Works</a></li>
                <li><a href="#research" className="hover:underline text-gray-300">Research</a></li>
                <li><a href="#benefits" className="hover:underline text-gray-300">Benefits</a></li>
                <li><a href="#final-cta-section" className="hover:underline text-gray-300">Pricing</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <p className="text-gray-300">Email: <a href="mailto:admin@atlastraining.io" className="hover:underline text-[#22C55E]">admin@atlastraining.io</a></p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2024 Atlas. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
