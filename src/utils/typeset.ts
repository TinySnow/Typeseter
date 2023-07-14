import { Option } from "@/models/option";
import { Flow } from "@/utils/flow";

const typeset = (text: string, o: Option): string => {
  const flow = new Flow(text);
  flow.addIndent(o.indent);
  return flow.done();
};

export { typeset };
