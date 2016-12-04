
import React, { PropTypes } from 'react'


export default React.createClass({
    displayName: 'Logo',

    propTypes: {
      color: PropTypes.string
    },

    getDefaultProps() {
      return{
        color: "white"
      }
    },

  render() {
    return (
      <svg width="97px" height="45px" viewBox="2 3 97 45" version="1.1" >
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <path d="M11.008,45.656 C14.3360166,45.656 16.8853245,44.6106771 18.656,42.52 C20.4266755,40.4293229 21.7599955,37.5920179 22.656,34.008 L21.504,34.008 C19.7973248,41.0053683 16.3840256,44.504 11.264,44.504 C8.7039872,44.504 6.9973376,43.6293421 6.144,41.88 C5.2906624,40.1306579 5.20532992,37.9333466 5.888,35.288 L10.816,15.512 C11.4560032,12.8666534 12.6506579,10.6693421 14.4,8.92 C16.1493421,7.17065792 18.3039872,6.296 20.864,6.296 C22.9120102,6.296 24.3946621,6.80799488 25.312,7.832 C26.2293379,8.85600512 26.6346672,10.1466589 26.528,11.704 C26.4213328,13.2613411 26.1760019,14.9573242 25.792,16.792 L26.944,16.792 C28.9066765,9.06929472 26.9653626,5.208 21.12,5.208 C18.1759853,5.208 15.7226765,6.15732384 13.76,8.056 C11.7973235,9.95467616 10.4320038,12.4399846 9.664,15.512 L4.736,35.288 C3.96799616,38.3600154 4.08532832,40.8559904 5.088,42.776 C6.09067168,44.6960096 8.06398528,45.656 11.008,45.656 Z M10.56,47.384 C7.01864896,47.384 4.64000608,46.2746778 3.424,44.056 C2.20799392,41.8373222 2.04799552,38.9146848 2.944,35.288 L7.872,15.512 C8.76800448,11.8853152 10.3893216,8.96267776 12.736,6.744 C15.0826784,4.52532224 18.026649,3.416 21.568,3.416 C25.6640205,3.416 28.1706621,4.70665376 29.088,7.288 C30.0053379,9.86934624 29.7386739,13.6346419 28.288,18.584 L23.552,18.584 C23.9786688,16.9626586 24.2666659,15.6506717 24.416,14.648 C24.5653341,13.6453283 24.6080003,12.5786723 24.544,11.448 C24.4799997,10.3173277 24.1066701,9.47466944 23.424,8.92 C22.7413299,8.36533056 21.7386733,8.088 20.416,8.088 C18.4106566,8.088 16.7466733,8.7813264 15.424,10.168 C14.1013267,11.5546736 13.1626694,13.3359891 12.608,15.512 L7.68,35.288 C7.16799744,37.4640109 7.21066368,39.255993 7.808,40.664 C8.40533632,42.072007 9.70665664,42.776 11.712,42.776 C14.0586784,42.776 15.8399939,41.880009 17.056,40.088 C18.2720061,38.295991 19.3066624,35.6720173 20.16,32.216 L24.896,32.216 C24.4266643,34.0506758 23.9786688,35.6186602 23.552,36.92 C23.1253312,38.2213398 22.5280038,39.575993 21.76,40.984 C20.9919962,42.392007 20.1280048,43.533329 19.168,44.408 C18.2079952,45.282671 17.0026739,45.9973306 15.552,46.552 C14.1013261,47.1066694 12.4373427,47.384 10.56,47.384 Z M32.544,45.944 C34.6880107,45.944 36.4959926,45.2960065 37.968,44 C39.4400074,42.7039935 40.4479973,40.9680109 40.992,38.792 L46.704,15.944 L45.84,15.944 L40.176,38.552 C39.6959976,40.5040098 38.8160064,42.0879939 37.536,43.304 C36.2559936,44.5200061 34.6560096,45.128 32.736,45.128 C30.8479906,45.128 29.5680034,44.528006 28.896,43.328 C28.2239966,42.127994 28.1279976,40.5360099 28.608,38.552 L34.272,15.944 L33.408,15.944 L27.744,38.792 C27.1999973,40.9680109 27.3359959,42.7039935 28.152,44 C28.9680041,45.2960065 30.4319894,45.944 32.544,45.944 Z M32.208,47.288 C29.6479872,47.288 27.8800049,46.5200077 26.904,44.984 C25.9279951,43.4479923 25.7599968,41.384013 26.4,38.792 L32.4,14.6 L35.952,14.6 L29.952,38.552 C29.5679981,40.1200078 29.6319974,41.3839952 30.144,42.344 C30.6560026,43.3040048 31.6319928,43.784 33.072,43.784 C34.5440074,43.784 35.775995,43.3040048 36.768,42.344 C37.760005,41.3839952 38.4479981,40.1200078 38.832,38.552 L44.832,14.6 L48.384,14.6 L42.336,38.792 C41.6959968,41.384013 40.4960088,43.4479923 38.736,44.984 C36.9759912,46.5200077 34.800013,47.288 32.208,47.288 Z M62.16,16.808 L62.4,15.944 L52.08,15.944 L44.688,45.656 L54.96,45.656 L55.2,44.84 L45.744,44.84 L49.104,31.304 L55.44,31.304 L55.632,30.488 L49.296,30.488 L52.704,16.808 L62.16,16.808 Z M63.216,18.104 L53.712,18.104 L50.928,29.144 L57.264,29.144 L56.4,32.648 L50.064,32.648 L47.376,43.496 L56.88,43.496 L56.016,47 L43.104,47 L51.12,14.648 L64.08,14.648 L63.216,18.104 Z M66.624,45.944 C68.7680107,45.944 70.5759926,45.2960065 72.048,44 C73.5200074,42.7039935 74.5279973,40.9680109 75.072,38.792 L80.784,15.944 L79.92,15.944 L74.256,38.552 C73.7759976,40.5040098 72.8960064,42.0879939 71.616,43.304 C70.3359936,44.5200061 68.7360096,45.128 66.816,45.128 C64.9279906,45.128 63.6480034,44.528006 62.976,43.328 C62.3039966,42.127994 62.2079976,40.5360099 62.688,38.552 L68.352,15.944 L67.488,15.944 L61.824,38.792 C61.2799973,40.9680109 61.4159959,42.7039935 62.232,44 C63.0480041,45.2960065 64.5119894,45.944 66.624,45.944 Z M66.288,47.288 C63.7279872,47.288 61.9600049,46.5200077 60.984,44.984 C60.0079951,43.4479923 59.8399968,41.384013 60.48,38.792 L66.48,14.6 L70.032,14.6 L64.032,38.552 C63.6479981,40.1200078 63.7119974,41.3839952 64.224,42.344 C64.7360026,43.3040048 65.7119928,43.784 67.152,43.784 C68.6240074,43.784 69.855995,43.3040048 70.848,42.344 C71.840005,41.3839952 72.5279981,40.1200078 72.912,38.552 L78.912,14.6 L82.464,14.6 L76.416,38.792 C75.7759968,41.384013 74.5760088,43.4479923 72.816,44.984 C71.0559912,46.5200077 68.880013,47.288 66.288,47.288 Z M86.832,16.856 L90.672,16.856 C92.9120112,16.856 94.3999963,17.4159944 95.136,18.536 C95.8720037,19.6560056 95.9520029,21.3359888 95.376,23.576 C94.2559944,28.184023 91.4880221,30.488 87.072,30.488 L83.424,30.488 L86.832,16.856 Z M83.232,31.352 L83.76,31.352 C85.1040067,31.352 86.0959968,31.3360002 86.736,31.304 C87.3760032,31.2719998 88.2159948,31.1920006 89.256,31.064 C90.2960052,30.9359994 91.0959972,30.7120016 91.656,30.392 C92.2160028,30.0719984 92.8319966,29.6320028 93.504,29.072 C94.1760034,28.5119972 94.7279978,27.7760046 95.16,26.864 C95.5920022,25.9519954 95.9679984,24.8560064 96.288,23.576 C96.8640029,21.2079882 96.7760038,19.3440068 96.024,17.984 C95.2719962,16.6239932 93.7280117,15.944 91.392,15.944 L86.256,15.944 L78.816,45.656 L79.632,45.656 L83.232,31.352 Z M84.24,32.696 L80.688,47 L77.184,47 L85.248,14.648 L91.728,14.648 C94.5120139,14.648 96.3599954,15.4399921 97.272,17.024 C98.1840046,18.6080079 98.2880035,20.7919861 97.584,23.576 C97.0719974,25.5600099 96.4080041,27.1839937 95.592,28.448 C94.7759959,29.7120063 93.7440062,30.639997 92.496,31.232 C91.2479938,31.824003 90.024006,32.215999 88.824,32.408 C87.623994,32.600001 86.0960093,32.696 84.24,32.696 Z M87.84,18.152 L85.104,29.144 L87.408,29.144 C90.9280176,29.144 93.1519954,27.2880186 94.08,23.576 C94.9760045,19.9599819 93.728017,18.152 90.336,18.152 L87.84,18.152 Z"
            id="cueup" stroke="none" fill-rule="evenodd">
          </path>
      </svg>
    )
    }
    })