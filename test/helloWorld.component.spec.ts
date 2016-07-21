import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import {expect} from 'chai';
import {HelloWorld} from './../ng2-super-table';

describe('hello-world component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should say hello world', async(() => {
    builder.createAsync(HelloWorld).then((fixture: ComponentFixture<HelloWorld>) => {
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML.trim()).to.equal('Hello world from the ng2 super table module!');
    });
  }));

});
