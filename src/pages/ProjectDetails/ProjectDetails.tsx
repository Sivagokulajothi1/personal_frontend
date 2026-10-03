import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code as Github } from 'lucide-react';
import type { Project } from '../../types/project';
import { getProjectBySlug } from '../../services/db';
import FadeIn from '../../components/animations/FadeIn';

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (slug) {
        const data = await getProjectBySlug(slug);
        setProject(data);
      }
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Project not found</h2>
        <Link to="/" className="text-purple-400 hover:text-purple-300">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <FadeIn>
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-full aspect-video rounded-3xl overflow-hidden bg-[#18181b] border border-white/5 mb-16 shadow-2xl shadow-purple-500/10 relative">
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 flex items-center justify-center">
                <span className="text-6xl font-bold text-white/10">{project.title}</span>
              </div>
            )}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {project.longDescription && (
              <FadeIn delay={0.3}>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Overview</h3>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="whitespace-pre-line leading-relaxed">{project.longDescription}</p>
                  </div>
                </div>
              </FadeIn>
            )}

            {project.features && project.features.length > 0 && (
              <FadeIn delay={0.4}>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="mr-3 text-purple-400 mt-1">✦</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
          </div>

          <div className="space-y-8">
            <FadeIn delay={0.3}>
              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Links</h3>
                <div className="space-y-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white group"
                    >
                      <Github size={20} className="mr-3 text-gray-400 group-hover:text-white" />
                      View Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors text-white shadow-lg shadow-purple-500/20"
                    >
                      <ExternalLink size={20} className="mr-3" />
                      Live Demo
                    </a>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <p className="text-gray-500 text-sm">No external links available for this project.</p>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
