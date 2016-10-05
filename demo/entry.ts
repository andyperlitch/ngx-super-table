// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The app module
import { DemoAppModule } from './demo';

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(DemoAppModule);
