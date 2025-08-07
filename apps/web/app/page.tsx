import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Activity, Shield, Zap, Globe, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            ✨ Monitor with confidence
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Never miss a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}downtime{' '}
            </span>
            again
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Monitor your websites 24/7 with real-time alerts, detailed analytics, 
            and comprehensive uptime reporting. Get notified instantly when something goes wrong.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              View Demo
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">30s</div>
              <div className="text-gray-600 dark:text-gray-400">Check Interval</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5min</div>
              <div className="text-gray-600 dark:text-gray-400">Alert Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to monitor your sites
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive monitoring tools that give you peace of mind and keep your users happy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: 'Real-time Monitoring',
                description: 'Get instant notifications when your website goes down or experiences issues.',
              },
              {
                icon: Shield,
                title: 'SSL Certificate Monitoring',
                description: 'Track SSL certificate expiration and get alerts before they expire.',
              },
              {
                icon: Zap,
                title: 'Performance Tracking',
                description: 'Monitor response times and performance metrics across all your sites.',
              },
              {
                icon: Globe,
                title: 'Global Monitoring',
                description: 'Check your websites from multiple locations around the world.',
              },
              {
                icon: TrendingUp,
                title: 'Detailed Analytics',
                description: 'Comprehensive reports and analytics to track your website performance.',
              },
              {
                icon: CheckCircle,
                title: 'Status Pages',
                description: 'Beautiful public status pages to keep your users informed.',
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core monitoring features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$9',
                description: 'Perfect for personal projects and small websites',
                features: [
                  'Up to 5 websites',
                  '5-minute checks',
                  'Email alerts',
                  'Basic analytics',
                  'SSL monitoring',
                ],
              },
              {
                name: 'Professional',
                price: '$29',
                description: 'Great for growing businesses and agencies',
                features: [
                  'Up to 25 websites',
                  '1-minute checks',
                  'SMS & Email alerts',
                  'Advanced analytics',
                  'SSL monitoring',
                  'Status pages',
                  'API access',
                ],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '$99',
                description: 'For large organizations with complex needs',
                features: [
                  'Unlimited websites',
                  '30-second checks',
                  'All alert types',
                  'Custom analytics',
                  'SSL monitoring',
                  'White-label status pages',
                  'Priority support',
                  'SLA guarantee',
                ],
              },
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''} hover:shadow-lg transition-all duration-200`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by thousands of businesses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our customers have to say about PingPulse.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CTO at TechStart',
                content: 'PingPulse has been invaluable for our uptime monitoring. The alerts are instant and the analytics help us optimize our infrastructure.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'DevOps Engineer at DataFlow',
                content: 'The global monitoring feature is fantastic. We can see how our sites perform from different regions and optimize accordingly.',
                rating: 5,
              },
              {
                name: 'Emma Williams',
                role: 'Founder at WebAgency',
                content: 'Great tool for managing multiple client websites. The status pages are beautifully designed and keep our clients informed.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to start monitoring?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust PingPulse to keep their websites online.
            Start your free trial today.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Start Free Trial - No Credit Card Required
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">PingPulse</span>
          </div>
          <p className="text-gray-400 mb-8">
            Reliable website monitoring for businesses of all sizes.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <Link href="#" className="hover:text-blue-400 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Support</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}