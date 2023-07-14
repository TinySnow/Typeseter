class Flow {
  private origin: string;
  private paragraphs: (string | null | undefined)[] = [];

  constructor(text: string) {
    this.origin = text;
    this.preprocess();
  }
  preprocess() {
    this.paragraphs = this.origin
      .split("\n")
      .map((paragraph) => paragraph.trim() || null)
      .filter((str) => str !== null);
  }

  addIndent(bool: Boolean) {
    if (!bool) return;
    else
      this.paragraphs = this.paragraphs.map((s: string | null | undefined) =>
        s?.replace(/^/, "　　")
      );
  }

  done() {
    return this.paragraphs.join("\n");
  }
}

export { Flow };
