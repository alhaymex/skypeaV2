import React from "react";
import Link from "next/link";
import { Newsletter } from "./Newsletter";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  columns: FooterColumn[];
  backgroundColor: string;
  textColor: string;
  showNewsletter: boolean;
  design?: "simple" | "multicolumn" | "newsletter";
  companyName: string;
}

export function Footer({
  columns,
  backgroundColor = "#FFF8E1", // default to light amber
  textColor = "#4A3500", // default to dark amber
  showNewsletter,
  design = "simple",
  companyName,
}: FooterProps) {
  const footerStyle = {
    backgroundColor,
    color: textColor,
    position: "relative" as const,
    overflow: "hidden",
  };

  const currentYear = new Date().getFullYear();

  // Hexagonal decoration component
  const HexagonalDecoration = () => (
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div
        className="absolute -top-8 left-4 w-16 h-16 bg-amber-200"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />
      <div
        className="absolute top-1/2 right-8 w-20 h-20 bg-amber-300"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />
      <div
        className="absolute bottom-4 left-1/3 w-12 h-12 bg-amber-100"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />
    </div>
  );

  const LinkList = ({ column }: { column: FooterColumn }) => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4 text-amber-900">
        {column.title}
      </h3>
      <ul className="space-y-2">
        {column.links.map((link, linkIndex) => (
          <li key={linkIndex}>
            <Link
              href={link.url}
              className="text-amber-700 hover:text-amber-500 transition-colors duration-200"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSimpleFooter = () => (
    <footer className="py-8 relative" style={footerStyle}>
      <HexagonalDecoration />
      <div className="container mx-auto px-4">
        <div className="relative z-10 flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-amber-900">
              {companyName}
            </h2>
            <p className="text-amber-700">
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((column, index) => (
              <LinkList key={index} column={column} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  const renderMultiColumnFooter = () => (
    <footer className="py-12 relative" style={footerStyle}>
      <HexagonalDecoration />
      <div className="container mx-auto px-4">
        <div className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {columns.map((column, index) => (
              <LinkList key={index} column={column} />
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-amber-200">
            <p className="text-center text-amber-700">
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderNewsletterFooter = () => (
    <footer className="py-12 relative" style={footerStyle}>
      <HexagonalDecoration />
      <div className="container mx-auto px-4">
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-amber-900">
                  {companyName}
                </h2>
                <p className="text-amber-700">
                  Stay updated with our latest news and offers.
                </p>
              </div>
              {showNewsletter && (
                <div className="p-6 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-200">
                  <Newsletter />
                </div>
              )}
            </div>
            {columns.map((column, index) => (
              <LinkList key={index} column={column} />
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-amber-200">
            <p className="text-center text-amber-700">
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  switch (design) {
    case "multicolumn":
      return renderMultiColumnFooter();
    case "newsletter":
      return renderNewsletterFooter();
    default:
      return renderSimpleFooter();
  }
}
