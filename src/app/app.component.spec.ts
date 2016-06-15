import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AngularFireTestAppComponent } from '../app/app.component';

beforeEachProviders(() => [AngularFireTestAppComponent]);

describe('App: AngularFireTest', () => {
  it('should create the app',
      inject([AngularFireTestAppComponent], (app: AngularFireTestAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular-fire-test works!\'',
      inject([AngularFireTestAppComponent], (app: AngularFireTestAppComponent) => {
    expect(app.title).toEqual('angular-fire-test works!');
  }));
});
