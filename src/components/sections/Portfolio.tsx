import { projects } from "../../data/projects";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Portfolio() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-2 mb-4">
            Recent Projects
          </h2>
          <p className="text-muted text-lg">
            See how we&apos;ve helped businesses grow with effective web design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-strong transition-shadow"
            >
            <div className="aspect-video bg-linear-to-br from-primary to-primary-light flex items-center justify-center"> 
               <span className="text-white/30 font-heading font-bold text-2xl">
                  {project.title}
                </span>
              </div>
              <div className="p-6">
                <p className="text-accent text-sm font-semibold mb-1">
                  {project.industry}
                </p>
                <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition">
                  {project.title}
                </h3>
                <p className="text-muted text-sm">{project.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" href="/portfolio">
            View Full Portfolio
          </Button>
        </div>
      </Container>
    </section>
  );
}