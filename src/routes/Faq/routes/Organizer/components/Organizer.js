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
      <p className="subtitle">For organizers</p>
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
                  label="Is it safe?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Where are the DJs available?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
               <Collapsible
                  label="Can I contact the DJ before booking?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="What if the DJ cancels?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                label="What if I cancel the event?"> 
                  <p>
                      Everywhere
                  </p>
              </Collapsible>
                  <Collapsible
                  label="What happens if the DJ does not show up?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
              <Collapsible
                label="What to do if the DJ want's to get paid under the table?"> 
                  <p>
                      Everywhere
                  </p>
              </Collapsible>
                <Collapsible
                  label="How many offers do I get?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can I contact a DJ directly?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="The money has not been charged from my card yet?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can I change the location of my event?"> 
                    <p>
                        Everywhere
                    </p>
                </Collapsible>
              </CollapsibleContainer>
      </div>

    )
  }
})
