"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Loader, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type Props = {
  blogSlug: string;
};

const ConnectDomain: React.FC<Props> = ({ blogSlug }) => {
  const { toast } = useToast();
  const [customDomain, setCustomDomain] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const cnameRecord = `${blogSlug}.skypea.net`;
  const txtRecord = `skypea-verification=${blogSlug}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The value has been copied to your clipboard.",
    });
  };

  const validateDomain = async () => {
    setIsValidating(true);
    setIsValid(null);

    try {
      const response = await fetch(
        `/api/validate-domain?domain=${customDomain}`
      );
      const data = await response.json();
      setIsValid(data.isValid);
    } catch (error) {
      console.error("Error validating domain:", error);
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Connect Your Domain
        </CardTitle>
        <CardDescription>
          Add a custom domain to your blog for a more professional look.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="custom-domain" className="text-sm font-medium">
            Enter your domain
          </Label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              id="custom-domain"
              placeholder="www.example.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="flex-grow"
            />
            <Button
              onClick={validateDomain}
              disabled={isValidating || !customDomain}
              className="w-full sm:w-auto"
            >
              {isValidating ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Validating...
                </>
              ) : (
                "Validate"
              )}
            </Button>
          </div>
          {isValid !== null && (
            <Alert variant={isValid ? "default" : "destructive"}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {isValid ? "Valid Configuration" : "Invalid Configuration"}
              </AlertTitle>
              <AlertDescription>
                {isValid
                  ? "Your domain is correctly configured."
                  : "Please check your DNS configuration and try again."}
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Configure DNS</h3>
          <p className="text-sm text-muted-foreground">
            Add the following DNS records to your domain&apos;s DNS
            configuration:
          </p>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2">Type</th>
                    <th className="text-left font-medium p-2">Name</th>
                    <th className="text-left font-medium p-2">Value</th>
                    <th className="text-left font-medium p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">CNAME</td>
                    <td className="p-2">@</td>
                    <td className="p-2">{cnameRecord}</td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(cnameRecord)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">TXT</td>
                    <td className="p-2">@</td>
                    <td className="p-2">{txtRecord}</td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(txtRecord)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectDomain;
