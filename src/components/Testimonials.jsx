import React, { useEffect, useRef, useState } from 'react';
import testimonialsImg1 from '../assets/images/testimonial-1.jpg';
import testimonialsImg2 from '../assets/images/testimonial-2.jpg';

const testimonials = [
  {
    id: 1,
    quote: 'Incredible ambiance and skilled therapists make Sheabutter Museum Wellness Spa the best!',
    body: 'The moment I stepped inside, all my worries melted away. The therapists here possess an extraordinary sensitivity — they seem to understand exactly what your body needs before you even say a word. I left feeling reborn.',
    name: 'Sahara Smith',
    location: 'Los Angeles, CA',
    image: testimonialsImg1,
  },
  {
    id: 2,
    quote: 'A transcendent experience that I return to again and again.',
    body: 'I have tried countless spas around the world, and Sheabutter Museum Wellness Spastands apart. The attention to detail is unmatched — from the warm greeting at arrival to the calming scents in every room. This is what true luxury feels like.',
    name: 'Marcus Chen',
    location: 'New York, NY',
    image: testimonialsImg2,
  },
];

const Testimonials = () => {
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
    <section className="section top-bottom-90px" ref={sectionRef}>
      <div className="container-default">
        <div className="overflow-hidden text-center mg-bottom-large">
          <h2 className={`display-9 reveal-up ${visible ? 'visible' : ''}`}>
            What our clients say
          </h2>
        </div>

        <div className="grid-2-columns">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`grid-1-column gap-row-none reveal-fade ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="card v2">
                <div className="overflow-hidden mg-bottom-small">
                  <h3 className="display-5">"{t.quote}"</h3>
                </div>
                <p className="mg-bottom-default">{t.body}</p>
                <div>
                  <div className="flex-horizontal justify-start gap-12px-wrap">
                    <div className="display-3 text-titles">{t.name}</div>
                    <div className="divider blog-divider"></div>
                    <div className="display-3 text-neutral-600">{t.location}</div>
                  </div>
                </div>
              </div>

              <div
                className="image-wrapper"
                style={{ height: '350px', overflow: 'hidden' }}
              >
                <img
                  src={t.image}
                  alt={`Testimonial from ${t.name}`}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="image fit-cover _w-h-100"
                  onError={(e) => {
                    const colors = ['#c4a882', '#a89070'];
                    e.target.parentElement.style.background = `linear-gradient(135deg, ${colors[index]}, #4a3728)`;
                    e.target.style.display = 'none';
                  }}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
