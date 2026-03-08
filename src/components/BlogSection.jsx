import React, { useEffect, useRef, useState } from 'react';
import blog1Img from '../assets/images/blog-1.jpg';
import blog2Img from '../assets/images/blog-2.jpg';

const articles = [
  {
    id: 1,
    category: 'Tips',
    date: 'Jan 6, 2025',
    title: 'Achieve ultimate relaxation with these spa tips',
    excerpt: 'Discover the expert-approved practices that transform a standard spa visit into a profound wellness journey.',
    image: blog1Img,
    href: '#blog-1',
  },
  {
    id: 2,
    category: 'Resources',
    date: 'Jan 6, 2025',
    title: 'How to choose the right spa treatment for your needs',
    excerpt: 'Understanding the vast array of spa treatments can be overwhelming. This guide helps you navigate the options and find your perfect match.',
    image: blog2Img,
    href: '#blog-2',
  },
];

const BlogSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" className="section top-90px" ref={sectionRef}>
      <div className="container-default">
        <div className="mg-bottom-medium">
          <div className="flex-horizontal space-between gap-default-wrap">
            <div className="overflow-hidden">
              <h2 className={`display-9 reveal-up ${visible ? 'visible' : ''}`}>
                Articles &amp; news
              </h2>
            </div>
            <div className={`buttons-row reveal-fade ${visible ? 'visible' : ''}`}>
              <a href="#all-articles" className="secondary-button">All articles</a>
            </div>
          </div>
        </div>

        <div className="grid-2-columns align-stretch gap-row-long">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className={`reveal-fade ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <a href={article.href} className="text-decoration-none _w-h-100 flex">
                <div className="flex-vertical" style={{ width: '100%' }}>
                  <div className="image-wrapper blog-picture-v3">
                    <img
                      src={article.image}
                      alt={article.title}
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="image fit-cover _w-h-100"
                      onError={(e) => {
                        const colors = ['#c4a882', '#b89a6e'];
                        e.target.parentElement.style.background = `linear-gradient(135deg, ${colors[index]}, #4a3728)`;
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="image-overlay"></div>
                  </div>

                  <div className="card-description-v2">
                    <div>
                      <div className="mg-bottom-default">
                        <div className="flex-horizontal justify-start gap-12px-wrap">
                          <div className="display-3 text-titles">{article.category}</div>
                          <div className="divider blog-divider"></div>
                          <div className="display-3 text-neutral-600">{article.date}</div>
                        </div>
                      </div>
                      <div className="overflow-hidden mg-bottom-12px">
                        <h2
                          className="heading display-7"
                          style={{ fontSize: '1.5rem', transition: 'color 0.3s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#8b6f47'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                        >
                          {article.title}
                        </h2>
                      </div>
                      <p className="mg-bottom-medium">{article.excerpt}</p>
                    </div>
                    <div className="divider"></div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
