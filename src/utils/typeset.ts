import { Option } from "@/models/option";
import { Flow } from "@/utils/flow";

const typeset = (text: string, o: Option): string => {
  const flow = new Flow(text);
  flow
    .deleteBlankLines(o.deleteBlankLines)
    .deleteSpaceInChineseCharacter(o.deleteSpaceInChineseCharacter)
    .insertIndent(o.insertIndent)
    .fixPunctuation(o.fixPunctuation)
    .insertSpaceInChineseAndEnglish(o.insertSpaceInChineseAndEnglish)
    .insertLineGap(o.lineGap);
  return flow.done();
};

export { typeset };
