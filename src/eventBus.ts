import Vue from "vue";

class EventBus extends Vue {}

const eventBus = new EventBus();
const vue$emit = eventBus.$emit;
eventBus.$emit = function(...args) {
  const event = args[0];
  console.info("EventBus event:", args);
  vue$emit.apply(eventBus, args);
  return eventBus;
};
export default eventBus;
