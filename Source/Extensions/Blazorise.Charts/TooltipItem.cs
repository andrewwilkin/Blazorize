using System;
using System.Collections.Generic;
using System.Text;

namespace Blazorise.Charts
{
    /// <summary>
    /// Maps to Tooltip Item Interface
    /// https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-item-interface
    /// </summary>
    public class TooltipItem
    {
        /// <summary>
        /// The label of the tooltip
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// The value of the tooltip (likely to be a number depending on the chart type)
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Index of the dataset the item comes from
        /// </summary>
        public int DatasetIndex { get; set; }

        /// <summary>
        /// Index of this data item in the dataset
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// X position of matching point (not sure this is an integer)
        /// </summary>
        public double X { get; set; }

        /// <summary>
        /// Y position of matching point (not sure this is an integer)
        /// </summary>
        public double Y { get; set; }

        //public string XLabel { get; set; }

        //public double YLabel { get; set; }
    }
}
