declare namespace NexTab {
  interface Options {
    /** Prefix for all CSS classes */
    prefix?: string;
    /** Enable or disable automatic initialization of components */
    autoInit?: boolean;
    /** Default theme (light or dark) */
    theme?: 'light' | 'dark';
    /** Enable or disable RTL support */
    rtl?: boolean;
    /** Breakpoints configuration */
    breakpoints?: {
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };
  }

  interface Component {
    /** Initialize the component */
    init(): void;
    /** Destroy the component and clean up event listeners */
    destroy(): void;
  }

  interface ThemeOptions {
    /** Key used for storing theme preference */
    storageKey?: string;
    /** Default theme */
    defaultTheme?: 'light' | 'dark';
    /** Available themes */
    themes?: string[];
    /** Selector for theme toggle buttons */
    toggleSelector?: string;
  }

  interface Theme extends Component {
    /** Get current theme */
    getTheme(): string;
    /** Set theme */
    setTheme(theme: string, store?: boolean): void;
    /** Clear stored theme preference */
    clearTheme(): void;
  }

  interface ModalOptions {
    /** Enable backdrop */
    backdrop?: boolean | 'static';
    /** Enable keyboard close */
    keyboard?: boolean;
    /** Focus first focusable element */
    focus?: boolean;
  }

  interface Modal extends Component {
    /** Show modal */
    show(): void;
    /** Hide modal */
    hide(): void;
    /** Toggle modal */
    toggle(): void;
  }

  interface DropdownOptions {
    /** Enable hover trigger */
    hover?: boolean;
    /** Placement of dropdown */
    placement?: 'top' | 'right' | 'bottom' | 'left';
    /** Offset from trigger */
    offset?: [number, number];
  }

  interface Dropdown extends Component {
    /** Show dropdown */
    show(): void;
    /** Hide dropdown */
    hide(): void;
    /** Toggle dropdown */
    toggle(): void;
  }

  interface TooltipOptions {
    /** Placement of tooltip */
    placement?: 'top' | 'right' | 'bottom' | 'left';
    /** Show delay in ms */
    delay?: number;
    /** HTML content allowed */
    html?: boolean;
  }

  interface Tooltip extends Component {
    /** Show tooltip */
    show(): void;
    /** Hide tooltip */
    hide(): void;
  }

  interface Instance {
    /** Initialize NexTab with options */
    init(options?: Options): void;
    /** Get registered plugin */
    getPlugin(name: string): Component;
    /** Register new plugin */
    use(name: string, plugin: any): void;
    /** Version number */
    version: string;
  }
}

declare const NexTab: NexTab.Instance;

export = NexTab;
export as namespace NexTab;
