export class JobModel {
  name = '';
  done = false;
  count = 0;

  constructor(name: string, done = false) {
    this.name = name;
    this.done = done;
  }

  getString(): string {
    if (this.count === 0) {
      return this.name;
    } else {
      return this.name + ' (' + this.count + ' )';
    }
  }
}
