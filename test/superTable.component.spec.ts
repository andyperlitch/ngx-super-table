import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import {expect} from 'chai';
import {SuperTable} from './../ng2-super-table';

describe('super-table component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should say hello world', async(() => {
    builder.createAsync(SuperTable).then((fixture: ComponentFixture<SuperTable>) => {
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML.trim()).to.equal('Hello world from the ng2 super table module!');
    });
  }));

});
