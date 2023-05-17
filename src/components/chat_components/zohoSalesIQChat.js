import React from "react";
import { useEffect } from "react";

//Zoho Sales Iq Script:
const useScript = (url, widgetCode) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");

    let code = `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "${widgetCode}", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="${url}";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);d.innerHTML = "<div id='zsiqwidget'></div>";`;

    script.appendChild(document.createTextNode(code));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

// Zoho Sales IQ widget code
export default function ZohoSalesIQ(props) {
  return (
    <React.Fragment>
      {useScript(
        "https://salesiq.zoho.com/widget",
        "a36b3ffffcedd553fccebd8493a26684750aed18e35bcd81cdedf68aae279135"
      )}
    </React.Fragment>
  );
}
