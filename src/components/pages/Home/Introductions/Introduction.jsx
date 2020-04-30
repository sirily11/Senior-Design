import React from "react";
import Portfolio from "./components/Portfolio";
import "../../../../assets/css/bootstrap.min.css";
import "../../../../assets/css/agency.min.css";

export default function Introduction() {
  const portfolioLinks = [
    {
      title: "Introduction",
      caption: "Introduction"
    },
    {
      title: "Safety Cases",
      caption: "What is a Safety Case?"
    },
    {
      title: "Justifications",
      caption: "What is a Justification?"
    },
    {
      title: "Solutions",
      caption: "What is a Solution?"
    },
    {
      title: "GSN",
      caption: "What is GSN?"
    },
    {
      title: "How to use our Website",
      caption: "Tutorial"
    }
  ];

  return (
    <div className="App">
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-lead-in">Senior Design 2020</div>
            <div className="intro-heading text-uppercase">
              Assurance Recipes
            </div>
            <a
              className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
              href="#services"
            >
              Introduction
            </a>
          </div>
        </div>
      </header>

      <section className="page-section" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Introduction</h2>
              <h3 className="section-subheading text-muted">
                With a field like synthetic biology making leaps and bounds
                every year towards a realization of industrial and commercial
                use, safety is at the forefront of the minds of individuals
                deciding whether to start incorporating genetically modified
                organisms into their daily routines. People want to be certain
                that this new and exciting opportunity will be safe for both
                them and their community. Synthetic biologists are no strangers
                to safety themselves while working with biohazardous materials
                and inside high-tech biology labs, but sometimes the safety of
                the end-goal, products, and processes utilized by people every
                day can elude even the most well-thought-out projects. This page
                hopes to help these projects work towards a safe implementation
                by logically breaking down and analyzing their safety concerns
                using Safety Cases (Cohen et al, 2016). Safety Cases take their
                design strategy from the aeronautics and software engineering
                communities (Kelly and Weaver, 2004) where they can also be seen
                under the title Assurance Arguments using Goal Structuring
                Notation (GSN). There they are used to ensure the safety of
                various parts of the aircraft and target certain problem areas
                in the functions and dangers of the process of flight. Unlike
                aeronautics, synthetic biologists do not have to worry about
                engine and wing design or console displays, but they do have to
                worry about accidental release of bacteria and plasmid
                conjugation as well as other concerns. As synthetic biology
                grows to new heights and levels of complexity, the number of
                safety concerns a single project or application needs to address
                will also grow. Just as people trust the engineering of an
                airplane despite the many risks, Safety Cases can help people
                who use genetically modified organisms feel confident that what
                they are using is safe.
              </h3>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Strategy</h4>
              <p className="text-muted">
                A Strategy is then used to break that Goal down into smaller
                sub-Goals that each address a aspect of the project. (Many
                times, one can’t explore all of the identified hazards in a
                situation. In this case, one would use a diamond (mentioned
                below) to symbolize the fact that there may be things in this
                area that need to be considered further.).
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Justifications</h4>
              <p className="text-muted">
                can be used to provide reasoning for a certain Strategy or Goal
                by reminding the viewer of certain facts established elsewhere.
                If a Strategy is “Argument over kill-switch parts” and is used
                with the Goal “Organism is safe in case of accidental release”
                and a sub-Goal “Organism is killed in the presence of 0.5 mM of
                HCl”, a Justification could further enhance the sub-Goal by
                stating “0.5 mM of HCl is not found in the intended
                environment”. Likewise, Assumptions can be used to narrow the
                scope of a Strategy or Goal. A good use of the Assumptions might
                be to state that one is assuming that some toxic chemical is not
                going to be added to the intended environment. One should also
                include these parameters in the initial Context units at the
                root of the Safety Case.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Solutions</h4>
              <p className="text-muted">
                Solutions are used to provide closure to Goals, their
                parent-Goals, and Safety Cases themselves. They can take the
                form of experimental data, modeling data, etc. The specific type
                of Solution that should be used is determined by the Goal they
                are solving and ultimately, the person filling out the Safety
                Case. If a creator of a Safety Case wishes to convey that a
                certain Goal or Strategy is not fully developed and needs more
                consideration before finalization, they attach a diamond onto
                the unit. A diamond on a Goal can denote a need to think of more
                Strategies, and a diamond on a Strategy can denote a need to
                think of more sub-Goals. Diamonds do not necessarily mean that a
                creator did not think about a branch of a Safety Case. It only
                means that the creator of the Safety Case is addressing a need
                for more consideration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Portfolio portfolioLinks={portfolioLinks}></Portfolio>

      <section className="page-section" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">
                Project Timeline
              </h2>
              <h3 className="section-subheading text-muted">
                Project Progress
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="timeline">
                <li>
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="img/about/1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>DateHERE</h4>
                      <h4 className="subheading">Nebraska</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Project started at Hackathon by _ and _
                      </p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="img/about/2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>August 2019 - December</h4>
                      <h4 className="subheading">Iowa State University</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">Senior Design Class 1</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="img/about/3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>January 2020 - May 2020</h4>
                      <h4 className="subheading">Iowa State University</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">Senior Design 2</p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="img/about/4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>2020+</h4>
                      <h4 className="subheading">Moving Forward</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">Project expansion plans</p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-image">
                    <h4>
                      Fully
                      <br />
                      Functional
                      <br />
                      Design!
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light page-section" id="team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Our Team</h2>
              <h3 className="section-subheading text-muted">
                Senior Design Group 26 - 2020
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="img/team/1.jpg"
                  alt=""
                />
                <h4>Myra Cohen</h4>
                <p className="text-muted">Project Leader</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="img/team/2.jpg"
                  alt=""
                />
                <h4>Matt Smith</h4>
                <p className="text-muted">Meeting Facilitator/Development</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="img/team/3.jpg"
                  alt=""
                />
                <h4>QiWei Li</h4>
                <p className="text-muted">Chief Engineer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="img/team/4.jpg"
                  alt=""
                />
                <h4>ShiWei Wang</h4>
                <p className="text-muted">Lead Test Engineer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="img/team/5.jpg"
                  alt=""
                />
                <h4>Garrett Harkness</h4>
                <p className="text-muted">Scribe/Test Engineer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src="img/team/6.jpg"
                  alt=""
                />
                <h4>Kevan Patel</h4>
                <p className="text-muted">Report Manager/Web Development</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p className="large text-muted">
                Senior Design Group 26 August 2019 - May 2020
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <a href="#something">
                <img
                  className="img-fluid d-block mx-auto"
                  src="img/logos/envato.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="#something">
                <img
                  className="img-fluid d-block mx-auto"
                  src="img/logos/designmodo.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="#something">
                <img
                  className="img-fluid d-block mx-auto"
                  src="img/logos/themeforest.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="#something">
                <img
                  className="img-fluid d-block mx-auto"
                  src="img/logos/creative-market.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Contact Us</h2>
              <h3 className="section-subheading text-muted">
                Have any questions? Let us know!
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form id="contactForm" name="sentMessage" novalidate="novalidate">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Your Name *"
                        required="required"
                        data-validation-required-message="Please enter your name."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="Your Email *"
                        required="required"
                        data-validation-required-message="Please enter your email address."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Your Phone *"
                        required="required"
                        data-validation-required-message="Please enter your phone number."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Your Message *"
                        required="required"
                        data-validation-required-message="Please enter a message."
                      ></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-lg-12 text-center">
                    <div id="success"></div>
                    <button
                      id="sendMessageButton"
                      className="btn btn-primary btn-xl text-uppercase"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <span className="copyright">SD26MAY2020</span>
            </div>
            <div className="col-md-4">
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-inline quicklinks">
                <li className="list-inline-item">
                  <a href="#something">FAQ</a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">Back to top</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
