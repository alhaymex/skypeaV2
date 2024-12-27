import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useProModal from "@/hooks/userProModal";

const ConnectDomainFree = () => {
  const proModal = useProModal();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Custom Domain</CardTitle>
        <CardDescription>
          Connect your own domain to your blog for a more professional look.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Pro Feature</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Custom domains are available for Pro users. Upgrade your plan to
            connect your own domain and unlock other premium features.
          </p>
          <Button onClick={() => proModal.setOpen(true)}>
            Upgrade to Pro
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectDomainFree;
