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
  backgroundColor,
  textColor,
  showNewsletter,
  design = "simple",
  companyName,
}: FooterProps) {
  const footerStyle = {
    backgroundColor,
    color: textColor,
  };

  const currentYear = new Date().getFullYear();

  const renderSimpleFooter = () => (
    <footer className="py-6" style={footerStyle}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">{companyName}</h2>
            <p>
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap justify-end">
            {columns.map((column, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 mb-6 md:mb-0"
              >
                <h3 className="text-lg font-semibold mb-2">{column.title}</h3>
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-1">
                      <Link href={link.url} className="hover:underline">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  const renderMultiColumnFooter = () => (
    <footer className="py-12" style={footerStyle}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url} className="hover:underline">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center">
            © {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  const renderNewsletterFooter = () => (
    <footer className="py-12" style={footerStyle}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{companyName}</h2>
            <p className="mb-4">
              Stay updated with our latest news and offers.
            </p>
            {showNewsletter && <Newsletter />}
          </div>
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url} className="hover:underline">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center">
            © {currentYear} {companyName}. All rights reserved.
          </p>
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
