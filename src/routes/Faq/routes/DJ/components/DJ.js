import React from 'react';
import {CollapsibleContainer, Collapsible} from '../../../../../components/common/Collapsible'

export default React.createClass({
  themeColor:"#31DAFF",

  componentDidMount(){

  },

  render() {
    return (
      <div>
      <h1>Questions and answers</h1>
      <p className="subtitle">For DJs</p>
        <CollapsibleContainer
          changeHash
        >
             <Collapsible
                  label="How much does it cost?" 
                 
                > 
                <p>
                    LASIK, or “laser-assisted in situ keratomileusis,” is the most common refractive surgery procedure. Refractive surgeries, including LASIK, reshape the cornea to correct distorted vision often eliminating the need for glasses or contacts.

                  Higher-order aberrations are visual problems not captured in a traditional eye exam. In a young healthy eye, the level of higher-order aberrations are typically low and insignificant. Concern has long plagued the tendency of refractive surgeries to induce higher-order aberration not correctible by traditional contacts or glasses. The advancement of lasik technique and technologies has helped eliminate the risk of clinically significant visual impairment after the surgery.

                  The following are some of the more frequently reported complications of LASIK:

                  1. Dry eyes

                  2. Overcorrection or undercorrection
                  </p>
                </Collapsible>
                <Collapsible
                  label="How much can I earn?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Where can I play?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can I talk to the organizer before paying?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="What if the organizer cancels the event?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                label="What if I cancel the gig?"> 
                  <p>
                      Everywhere
                  </p>
              </Collapsible>
              <Collapsible
                label="What to do if the organizer want's to pay under the table?"> 
                  <p>
                      Everywhere
                  </p>
              </Collapsible>
                <Collapsible
                  label="Does the organizer always choose the cheapest offer?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can my own customers pay through Cueup?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="How quickly do I get my money?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Does Cueup pay my taxes?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Is my profile public?"  
                > 
                <p>
                    LASIK, or “laser-assisted in situ keratomileusis,” is the most common refractive surgery procedure. Refractive surgeries, including LASIK, reshape the cornea to correct distorted vision often eliminating the need for glasses or contacts.

                  Higher-order aberrations are visual problems not captured in a traditional eye exam. In a young healthy eye, the level of higher-order aberrations are typically low and insignificant. Concern has long plagued the tendency of refractive surgeries to induce higher-order aberration not correctible by traditional contacts or glasses. The advancement of lasik technique and technologies has helped eliminate the risk of clinically significant visual impairment after the surgery.

                  The following are some of the more frequently reported complications of LASIK:

                  1. Dry eyes

                  2. Overcorrection or undercorrection
                  </p>
                </Collapsible>
              </CollapsibleContainer>
      </div>

    )
  }
})
