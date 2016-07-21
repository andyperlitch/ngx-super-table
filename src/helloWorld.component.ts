import {
  Component
} from '@angular/core';

@Component({
  selector: 'hello-world',
  template: 'Hello world from the {{ projectTitle }} module!'
})
export class HelloWorld {
  projectTitle: string = 'ng2 super table';
}
