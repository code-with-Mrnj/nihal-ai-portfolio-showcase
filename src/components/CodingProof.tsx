import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Code2, Brain, Target, Zap } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

export function CodingProof() {
  return (
    <section id="coding-proof" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
              Problem Solving & <span className="text-portfolio-accent">Coding Proof</span>
            </h2>
            <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
              Consistent practice in Data Structures, Algorithms, and Machine Learning problem solving. 
              Not just building projects — actively solving real problems every day.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <StaggerContainer className="grid md:grid-cols-2 gap-8">
              {/* LeetCode Card */}
              <StaggerItem>
                <Card className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-portfolio-accent/10 rounded-lg">
                        <Code2 className="h-6 w-6 text-portfolio-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-portfolio-text group-hover:text-portfolio-accent transition-colors">
                        LeetCode
                      </h3>
                    </div>

                    {/* LeetCode Stats Card */}
                    <div className="mb-6 rounded-lg overflow-hidden bg-portfolio-bg/50 p-2">
                      <img 
                        src="https://leetcard.jacoblin.cool/nobiniyan?theme=dark&font=Karma&ext=heatmap"
                        alt="LeetCode Stats for nobiniyan"
                        className="w-full h-auto rounded"
                        loading="lazy"
                      />
                    </div>

                    {/* Focus Areas */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-portfolio-text-muted uppercase tracking-wider mb-3">
                        Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-portfolio-bg border border-portfolio-border text-portfolio-text">
                          <Target className="h-3 w-3 mr-1" />
                          Data Structures & Algorithms
                        </Badge>
                        <Badge className="bg-portfolio-bg border border-portfolio-border text-portfolio-text">
                          <Zap className="h-3 w-3 mr-1" />
                          Problem Solving
                        </Badge>
                        <Badge className="bg-portfolio-bg border border-portfolio-border text-portfolio-text">
                          <Code2 className="h-3 w-3 mr-1" />
                          Competitive Coding
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      asChild
                    >
                      <a href="https://leetcode.com/u/nobiniyan/" target="_blank" rel="noopener noreferrer">
                        View LeetCode Profile
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>

              {/* Deep-ML Card */}
              <StaggerItem>
                <Card className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-portfolio-accent/10 rounded-lg">
                        <Brain className="h-6 w-6 text-portfolio-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-portfolio-text group-hover:text-portfolio-accent transition-colors">
                        Deep-ML
                      </h3>
                    </div>

                    {/* Stats Display */}
                    <div className="mb-6 bg-portfolio-bg/50 rounded-lg p-6 text-center">
                      <div className="text-5xl font-bold text-portfolio-accent mb-2">175+</div>
                      <div className="text-lg text-portfolio-text">Machine Learning Problems Solved</div>
                    </div>

                    {/* Focus Points */}
                    <div className="mb-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-portfolio-accent/20 rounded-full mt-0.5">
                          <Target className="h-3 w-3 text-portfolio-accent" />
                        </div>
                        <p className="text-portfolio-text-muted text-sm">
                          Focus on Machine Learning fundamentals and core algorithms
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-portfolio-accent/20 rounded-full mt-0.5">
                          <Brain className="h-3 w-3 text-portfolio-accent" />
                        </div>
                        <p className="text-portfolio-text-muted text-sm">
                          Math, probability, statistics, and ML reasoning
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-portfolio-accent/20 rounded-full mt-0.5">
                          <Zap className="h-3 w-3 text-portfolio-accent" />
                        </div>
                        <p className="text-portfolio-text-muted text-sm">
                          Hands-on problem solving beyond theory
                        </p>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      asChild
                    >
                      <a href="https://www.deep-ml.com/profile/xa5C6zpIlqTtlGlGZu8mYekLwlj2" target="_blank" rel="noopener noreferrer">
                        View Deep-ML Profile
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
