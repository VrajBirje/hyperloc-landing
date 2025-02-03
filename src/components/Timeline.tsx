import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React from "react";

const Timeline = () => {
  const timelineHead = "Steps to Order";
  return (
    <section id="Steps">
      <div className="flex flex-col w-full gap-[60px] mt-[100px]">
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {timelineHead.split(" ").map((word, index) => (
            <span
              key={index}
              className={index % 2 ? "text-primary" : "text-[#ec4755]"}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
        <VerticalTimeline lineColor="red">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2010 - 2011"
            contentStyle={{ background: "#ec4755", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #ec4755" }}
            iconStyle={{ background: "#ec4755", color: "#fff" }}
            icon={
              <img
                src="/1icon.png"
                style={{ height: "100%", width: "100%", padding: "14px" }}
              ></img>
            }
          >
            <h3 className="vertical-timeline-element-title">Step 1</h3>
            <p>Click the WhatsApp button & text us.</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2008 - 2010"
            iconStyle={{ background: "#ec4755", color: "#fff" }}
            contentStyle={{ background: "#ec4755", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #ec4755" }}
            icon={
              <img
                src="/2icon.png"
                style={{ height: "100%", width: "100%", padding: "14px" }}
              ></img>
            }
          >
            <h3 className="vertical-timeline-element-title">Step 2</h3>
            <p>
              Tell us what you need (Food, Groceries, Fruits, Vegetables,
              Medicines).
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2006 - 2008"
            iconStyle={{ background: "#ec4755", color: "#fff" }}
            contentStyle={{ background: "#ec4755", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #ec4755" }}
            icon={
              <img
                src="/3icon.png"
                style={{ height: "100%", width: "100%", padding: "14px" }}
              ></img>
            }
          >
            <h3 className="vertical-timeline-element-title">Step 3</h3>
            <p>We deliver it to you quickly.</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
