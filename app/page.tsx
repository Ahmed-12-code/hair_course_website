"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Clock, Package, CheckCircle2, Gift, Sparkles, Leaf, Heart, Baby, Zap, Star, Instagram } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function HomePage() {
  const router = useRouter();
  const heroSection = useScrollAnimation({ threshold: 0.2 })
  const productSection = useScrollAnimation({ threshold: 0.15 })
  const testimonialsSection = useScrollAnimation({ threshold: 0.15 })
  const contentsSection = useScrollAnimation({ threshold: 0.2 })
  const featuresSection = useScrollAnimation({ threshold: 0.15 })
  const influencersSection = useScrollAnimation({ threshold: 0.2 })
  const faqSection = useScrollAnimation({ threshold: 0.2 })
  const orderSection = useScrollAnimation({ threshold: 0.2 })

  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const targetDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const form = e.currentTarget;
  
    // نعرف أنهي زرار اتضغط باستخدام submitter
    const shampooValue = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("data-shampoo") || "no";
  
    const data = {
      choice: form.querySelector<HTMLInputElement>('input[name="choice"]:checked')?.value || "",
      blonde: form.querySelector<HTMLInputElement>('input[name="blonde"]:checked')?.value || "",
      name: form.querySelector<HTMLInputElement>('#name')?.value || "",
      phone: form.querySelector<HTMLInputElement>('#phone')?.value || "",
      area: form.querySelector<HTMLInputElement>('#area')?.value || "",
      shampoo: shampooValue, // ← هنا الإضافة الجديدة
    };
  
    console.log("Sending:", data);
    router.push("/thank-you");
  
    try {
      const res = await fetch("/api/send-to-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        alert("حصل خطأ أثناء إرسال البيانات، حاول مرة أخرى.");
      } 
    } catch (err) {
      console.error(err);
      alert("حصل خطأ أثناء إرسال البيانات، تحقق من اتصالك بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-background transition-colors duration-500" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 border-b border-primary/20 backdrop-blur-md animate-slide-down shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-auto h-12 flex items-center justify-center hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-primary/30">
              <img src="/logo.jpg" alt="لوجو صدمة" width={120} height={48} className="h-12 w-auto object-contain" />
            </div>
          </div>

          <div className="flex items-center gap-3 animate-slide-in-right">
            <ThemeToggle />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 hover:shadow-xl transition-all duration-500 shadow-lg">
              اشترك الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Countdown */}
      <section
        ref={heroSection.ref as React.RefObject<HTMLElement>}
        className={`py-12 bg-gradient-to-b from-secondary/30 to-transparent overflow-hidden relative transition-all duration-1000 ${
          heroSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          backgroundImage: "url('/organic-care.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-secondary/30 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight animate-fade-in-up text-balance">
              لأول مرة – عرض الجمعة البيضاء
            </h1>

            <div className="space-y-4 animate-scale-in-bounce" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-center gap-4 text-center">
                <span className="text-5xl md:text-7xl font-bold text-primary animate-number-bounce">295﷼</span>
                <span className="text-3xl md:text-5xl text-muted-foreground line-through animate-fade-in">550﷼</span>
              </div>
              <p className="text-xl md:text-2xl text-foreground font-semibold animate-pulse-slow">فقط</p>
            </div>

            <div
              className="space-y-4 p-6 bg-secondary/50 rounded-2xl animate-slide-in-right backdrop-blur-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-primary animate-spin-slow" />
                <p className="text-xl font-bold text-foreground">لمدة 72 ساعة فقط (من 28 إلى 30 نوفمبر)</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Package className="w-6 h-6 text-primary animate-bounce-subtle" />
                <p className="text-lg text-foreground">الكمية محدودة – العرض لأول 50 طلب فقط</p>
              </div>
            </div>

            <div
              className="mt-6 space-y-3 p-6 bg-card rounded-2xl shadow-xl animate-fade-in-up border-2 border-primary/20"
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-center justify-center gap-2 text-destructive font-bold">
                <span className="text-2xl">⛔</span>
                <p>ما نقدر نكرر نفس العرض مرة ثانية</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <p>بعد 30 نوفمبر، السعر بيرجع 550﷼</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Gift className="w-5 h-5 text-primary" />
                <p>التوصيل مجاني داخل الدوحة، وبسعر رمزي خارجها.</p>
              </div>
            </div>

            <div className="mt-8">
              <p
                className="text-xl font-semibold text-foreground mb-4 animate-fade-in flex items-center justify-center gap-2"
                style={{ animationDelay: "800ms" }}
              >
                <Clock className="w-6 h-6 text-primary animate-pulse" />
                ينتهي العرض خلال:
              </p>
              <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
                {[
                  { value: timeLeft.seconds, label: "ثانية" },
                  { value: timeLeft.minutes, label: "دقيقة" },
                  { value: timeLeft.hours, label: "ساعة" },
                  { value: timeLeft.days, label: "يوم" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-primary rounded-xl p-4 md:p-6 shadow-xl animate-scale-in-bounce hover:scale-110 hover:rotate-3 transition-all duration-500 countdown-glow border-2 border-primary-foreground/20"
                    style={{ animationDelay: `${900 + index * 100}ms` }}
                  >
                    <div className="text-3xl md:text-5xl font-bold text-primary-foreground animate-number-flip">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-semibold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-6 mt-8 animate-bounce-gentle cta-glow hover:scale-110 hover:rotate-1 transition-all duration-500 shadow-2xl"
              style={{ animationDelay: "1300ms" }}
            >
              احجز الآن بالسعر المخفض
            </Button>
          </div>
        </div>
      </section>

      {/* Product Description Section */}
      <section
        ref={productSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-card transition-all duration-1000 delay-100 ${
          productSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight text-balance animate-fade-in-up">
                كورس صدمة – نظام طبيعي شامل يعالج الشعر من الجذور، ويعيد له القوة، الكثافة، والطول… بدون مواد كيميائية
                أو وعود كاذبة.
              </h2>

              <div className="mt-12 flex justify-center">
                <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-700 animate-fade-in-up border-4 border-primary/30">
                  <img
                    src="/product-set.jpg"
                    alt="منتجات كورس صدمة"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-secondary/20 transition-all duration-1000 delay-200 ${
          testimonialsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-primary fill-primary" />
                بعض من آراء وتجارب عميلاتي للكورس
              </h2>
              <p className="text-lg text-primary font-semibold animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                متوفر بحساب الانستقرام أكثر من 800 تجربة حقيقية وناجحة للكورس
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "وااايد واايد حبيته، كان فيني ثعلبة وطلع فيها شعر وطول الحين نفس طول شعري ماشاءالله",
                "مافي غيره وقفلي التساقط",
                "شعري طول بسرعة والتساقط خف بشكل ملحوظ، حتى الشيب الخفيف اللي عندي تغطى بشكل حلو",
                "والله مجهود جبار وفعلا الله يعطيج العافية على الشغل اللي تسوينه، استفدت وحتى لما اترك الكورس فترة شعري يتم بنفس المستوى",
                "تباااارك الله انا اول ماخذته منج كان عندي تساقط فضيع، غير ان طوله كان ثابت، الحين ماشاءالله مبين الفرق مع اني ما التزمت بالجدول عدليعل يدج ماتمسها النار، الكورس حلال فيه كل ريال",
                "والله وايد استفدت شعري كثف وطول وتغير بشكل كبير عمره في حياتي كلها ماكان جي الحمدلله صار يطول وصحي اكثر، وماشاءالله الكمية كبيرة طولت وياي",
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card border-primary/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up card-hover-glow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex gap-1 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mt-4 text-right">{testimonial}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Contents - Accordion */}
      <section
        ref={contentsSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-card transition-all duration-1000 delay-100 ${
          contentsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 animate-fade-in-up flex items-center justify-center gap-3">
              <Package className="w-8 h-8 text-primary animate-bounce-subtle" />
              شنو داخل الكورس؟
            </h2>

            <div className="animate-slide-in-up">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="contents"
                  className="border-primary/30 bg-secondary/10 rounded-lg px-6 hover:bg-secondary/20 hover:shadow-lg transition-all duration-500"
                >
                  <AccordionTrigger className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300">
                    محتويات الكورس
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <div className="grid gap-4">
                      {[
                        { name: "زيت صدمة", image: "/oil-bottle.jpg", icon: Sparkles },
                        { name: "تونك الفراغات", image: "/tonic-bottle.jpg", icon: Zap },
                        { name: "ماسك الأرقان بالحبة السوداء", image: "/argan-mask.jpg", icon: Heart },
                        { name: "سيروم الترطيب", image: "/serum-bottle.jpg", icon: Sparkles },
                        { name: "سدر أو حنا بالأعشاب (اختاروا واحد فقط)", image: "/sidr-henna.jpg", icon: Leaf },
                      ].map((product, index) => {
                        const Icon = product.icon
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-card rounded-lg border border-primary/20 hover:shadow-xl hover:border-primary/40 hover:scale-105 transition-all duration-500 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0 overflow-hidden shadow-md">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Icon className="w-5 h-5 text-primary animate-pulse" />
                            <p className="text-foreground font-medium">{product.name}</p>
                          </div>
                        )
                      })}
                      <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 hover:scale-105 transition-all duration-500 flex items-center gap-3">
                        <Gift className="w-5 h-5 text-primary animate-bounce-subtle" />
                        <p className="text-foreground">بعض الهدايا المتواضعة على حسب المتوفر</p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 hover:scale-105 transition-all duration-500 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary animate-pulse" />
                        <p className="text-foreground">جدول سهل لروتين استخدام المحتويات</p>
                      </div>
                    </div>

                    <div className="mt-6 p-6 bg-secondary/50 rounded-xl border-2 border-primary/30 hover:border-primary/50 hover:shadow-xl hover:scale-105 transition-all duration-500">
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        <p className="text-foreground font-semibold text-center">
                          تقدرين تضيفين شامبو الكافيين وقت الدفع بسعر خاص: 75﷼ بدل 100
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        ref={featuresSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-secondary/20 transition-all duration-1000 delay-200 ${
          featuresSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 animate-fade-in-up flex items-center justify-center gap-3">
              <Leaf className="w-8 h-8 text-primary animate-spin-slow" />
              المميزات الأساسية
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Leaf, text: "منتجات طبيعية مدروسة بتركيبة فعّالة" },
                { icon: Sparkles, text: "بدون أي روائح مزعجة – تقدرون تستخدمونه في أي وقت وأي مكان" },
                { icon: Heart, text: "مناسبة للفروة الحساسة" },
                { icon: CheckCircle2, text: "آمن للي مسوية بروتين أو كيراتين" },
                { icon: Baby, text: "آمن للأطفال، الحوامل، والمرضعات" },
                { icon: Zap, text: "يحل مشكلة الصلع الوراثي، الثعلبة، ومناطق الفراغات" },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="p-6 bg-card border-primary/20 hover:shadow-2xl hover:-translate-y-3 hover:rotate-2 transition-all duration-700 animate-slide-in-up card-hover-glow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <Icon
                        className="w-8 h-8 text-primary animate-bounce-subtle flex-shrink-0"
                        style={{ animationDelay: `${index * 100}ms` }}
                      />
                      <p className="text-card-foreground leading-relaxed">{feature.text}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Influencers Section */}
      <section
        ref={influencersSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-card transition-all duration-1000 delay-100 ${
          influencersSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-in-up">
              اتشرف بتجربة وثقة
            </h2>
            <p
              className="text-2xl text-center text-primary font-semibold mb-12 animate-fade-in-up flex items-center justify-center gap-2"
              style={{ animationDelay: "200ms" }}
            >
              <Star className="w-6 h-6 fill-primary animate-pulse" />
              شخصيات مؤثرة
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-secondary/20 border-primary/20 hover:shadow-2xl hover:scale-110 hover:rotate-2 transition-all duration-700 animate-slide-in-right card-hover-glow">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="aspect-square w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl hover:scale-110 hover:rotate-12 transition-all duration-700">
                    <img src="/celebrity-actress.jpg" alt="منى شداد" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">منى شداد</h3>
                    <p className="text-primary font-semibold">ممثلة</p>
                  </div>
                </div>
              </Card>

              <Card
                className="p-8 bg-secondary/20 border-primary/20 hover:shadow-2xl hover:scale-110 hover:rotate-2 transition-all duration-700 animate-slide-in-left card-hover-glow"
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="aspect-square w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl hover:scale-110 hover:rotate-12 transition-all duration-700">
                    <img src="/celebrity-broadcaster.jpg" alt="حنين النقدي" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">حنين النقدي</h3>
                    <p className="text-primary font-semibold">إعلامية</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-secondary/20 transition-all duration-1000 delay-200 ${
          faqSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 animate-fade-in-up">
              الأسئلة المتكررة
            </h2>

            <div className="animate-slide-in-up">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    q: "شنو يفرق كورس صدمة عن باقي المنتجات اللي بالسوق؟",
                    a: "الكورس مب منتج واحد، هو نظام كامل يعالج الشعر من الجذور، والنتائج تبدأ من أول أسبوع.",
                  },
                  {
                    q: "أنا ما أحب الروتينات الثقيلة، أقدر ألتزم؟",
                    a: "أكيد، الجدول بسيط جدًا. تحتاجين 3 منتجات فقط ضمن الجدول، والباقي تستخدمينه براحتك.",
                  },
                  {
                    q: "أنا مشغولة وما عندي وقت، هل يناسبني؟",
                    a: "إيه، الخطوات قصيرة وسهلة وتندمج في يومك بدون ما تاخذ وقت.",
                  },
                  {
                    q: "السعر شوي مرتفع بالنسبة لي…",
                    a: "سعره الأصلي 550﷼، والعرض الحالي 295﷼ فقط لأول 50 طلب. هذي فرصتك تاخذين النتيجة بأقل من نص السعر.",
                  },
                  {
                    q: "وإذا ما شفت نتيجة؟",
                    a: "الترطيب بيظهر من أول يوم، والتساقط يخف من ثاني أسبوع. إذا التزمتوا بالخطوات، وفيتاميناتكم في مستواها الطبيعي مستحيل ماتشوفون نتيجة.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-primary/30 bg-card rounded-lg px-6 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary text-right transition-colors duration-300">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-card-foreground leading-relaxed text-right">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section
        ref={orderSection.ref as React.RefObject<HTMLElement>}
        className={`py-16 bg-card transition-all duration-1000 delay-100 ${
          orderSection.isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-primary/30 shadow-2xl animate-scale-in-bounce form-glow hover:shadow-primary/20 transition-all duration-700">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8 animate-fade-in">
                احجز الآن بالسعر المخفض
              </h2>

              <form name="orderForm" className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
                   <Label htmlFor="choice" className="text-foreground font-semibold text-lg">
                     حددي اختيارك - السدر او الحنا؟ </Label>
                      <p className="text-sm text-primary">
                         كلهم ممتازين ونفس المفعول ونفس الفوايد بس الفرق ان السدر بدون لون </p> 
                         <RadioGroup defaultValue="henna" name="choice" className="space-y-3 mt-4">
                           <div className="flex items-center space-x-2 space-x-reverse p-4 border-2 border-primary/20 rounded-lg hover:bg-secondary/20 hover:border-primary/40 hover:scale-105 transition-all duration-500 hover:shadow-md">
                            <RadioGroupItem value="henna" id="henna" className="border-primary" />
                             <Label htmlFor="henna" className="cursor-pointer flex-1 text-foreground"> الحنا بالأعشاب </Label> 
                             </div> 
                             <div className="flex items-center space-x-2 space-x-reverse p-4 border-2 border-primary/20 rounded-lg hover:bg-secondary/20 hover:border-primary/40 hover:scale-105 transition-all duration-500 hover:shadow-md"> <RadioGroupItem value="sidr" id="sidr" className="border-primary" />
                              <Label htmlFor="sidr" className="cursor-pointer flex-1 text-foreground"> السدر بالأعشاب </Label> 
                              </div> </RadioGroup> </div> <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "300ms" }}> 
                                <Label htmlFor="blonde" className="text-foreground font-semibold flex items-center gap-2">
                                   <Sparkles className="w-5 h-5 text-primary" /> هل الشعر مصبوغ أشقر؟ </Label> <RadioGroup defaultValue="no" name="blonde" className="space-y-3 mt-4">
                                     <div className="flex items-center space-x-2 space-x-reverse p-4 border-2 border-primary/20 rounded-lg hover:bg-secondary/20 hover:border-primary/40 hover:scale-105 transition-all duration-500 hover:shadow-md">
                                      <RadioGroupItem value="yes" id="blonde-yes" className="border-primary" /> 
                                      <Label htmlFor="blonde-yes" className="cursor-pointer flex-1 text-foreground"> نعم </Label> 
                                      </div> 
                                      <div className="flex items-center space-x-2 space-x-reverse p-4 border-2 border-primary/20 rounded-lg hover:bg-secondary/20 hover:border-primary/40 hover:scale-105 transition-all duration-500 hover:shadow-md"> 
                                      <RadioGroupItem value="no" id="blonde-no" className="border-primary" />
                                       <Label htmlFor="blonde-no" className="cursor-pointer flex-1 text-foreground"> لا </Label> </div> </RadioGroup> </div>
                <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "400ms" }}>
                  <Label htmlFor="name" className="text-foreground font-semibold">
                    الاسم:
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="border-primary/30 focus:border-primary hover:border-primary/50 transition-all duration-500 focus:scale-105 hover:shadow-md"
                  />
                </div>

                <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "500ms" }}>
                  <Label htmlFor="phone" className="text-foreground font-semibold">
                    رقم الجوال:
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="border-primary/30 focus:border-primary hover:border-primary/50 transition-all duration-500 focus:scale-105 hover:shadow-md"
                  />
                </div>

                <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "600ms" }}>
                  <Label htmlFor="area" className="text-foreground font-semibold">
                    المنطقة:
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    required
                    className="border-primary/30 focus:border-primary hover:border-primary/50 transition-all duration-500 focus:scale-105 hover:shadow-md"
                  />
                  <p className="text-xs text-primary">
                    [للمناطق خارج الدوحة الرجاء تسليم المندوب رسوم التوصيل (الرمزية) التي يحددها]
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                   data-shampoo="no"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-6 hover:scale-110 hover:rotate-1 transition-all duration-500 shadow-2xl cta-glow animate-bounce-gentle"
                  style={{ animationDelay: "700ms" }}
                >
                  اطلب الآن - 295﷼
                </Button>
                <Button
                  type="submit"
                  size="lg"
                   data-shampoo="yes"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-6 hover:scale-110 hover:rotate-1 transition-all duration-500 shadow-2xl cta-glow animate-bounce-gentle"
                  style={{ animationDelay: "750ms" }}
                >
                  اطلب الكورس + الشامبو (75﷼) — 370﷼
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>


      <footer className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 animate-fade-in">
            <p className="text-lg font-semibold">كورس صدمة - العناية الطبيعية بالشعر</p>
            <Link
              href="https://www.instagram.com/zetqr?igsh=MTRnMjF5cGsycDBnMQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground hover:text-secondary transition-colors duration-300 hover:scale-110 transform"
            >
              <Instagram className="w-6 h-6" />
              <span className="font-semibold">تابعونا على الانستقرام</span>
            </Link>
            <p className="text-sm opacity-90">جميع الحقوق محفوظة © 2025</p>
          </div>
        </div>
      </footer>

      {/* Fixed Footer with Creator Attribution */}
      <footer className="fixed bottom-0 right-0 left-0 bg-background/95 backdrop-blur-sm border-t border-border py-3 z-40">
        <div className="container mx-auto px-4 flex justify-center">
          <p className="text-sm text-muted-foreground">
            Site by{" "}
            <a
              href="https://v0-portfolio-with-resume-nu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline transition-colors duration-200"
            >
              Moamen Gad
            </a>
          </p>
        </div>
      </footer>

      {/* Padding to Account for Fixed Footer */}
      <div className="h-12" />
    </div>
  )
}
