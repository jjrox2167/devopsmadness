import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AccountOverview() {
  
  return (
    <div className="">   {/* Remove the max width constraint */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold">My Account</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Recent sign-ins and account activity.
        </p>
        <Separator className="my-4" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information:</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          Your full width content here...
        </CardContent>
        </Card>
      </div>
   
  );
}