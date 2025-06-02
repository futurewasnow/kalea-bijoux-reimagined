
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Kalea family! 💎",
        description: "You'll be the first to know about new collections and special offers.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join the Crystal
            <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be the first to discover new collections, get styling tips, and receive exclusive offers 
            designed just for our crystal-loving community.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 focus:border-rose-400"
              required
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              Join Us ✨
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
