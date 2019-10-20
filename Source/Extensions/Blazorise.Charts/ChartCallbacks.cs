using System;
using System.Collections.Generic;
using System.Text;

namespace Blazorise.Charts
{
    public class ChartCallbacks
    {
        public bool HasClickEvent { get; set; }

        public bool HasHoverEvent { get; set; }

        public ChartCallbacksTooltips ChartCallbacksTooltips { get; set; }
    }
}
