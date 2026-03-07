# SOLID Principles in React & PandaCSS

# Loaded: Phase 3-4 (Implementation & Refactor)

# Practical examples of SOLID principles in FulgensUI context

version: 1.0

## Single Responsibility Principle (SRP)

**Definition:** A component/module should have one, and only one, reason to change.

### ❌ Violation: Component Does Too Much

```typescript
// BAD: Button handles rendering, data fetching, and state management
function Button({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user</div>;

  return (
    <button className={button()}>
      {user.name}
    </button>
  );
}
```

**Problems:**

- Button responsible for data fetching
- Button responsible for loading states
- Button responsible for error handling
- Button responsible for rendering

### ✅ Solution: Separate Concerns

```typescript
// GOOD: Button only renders UI
function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={button({ ...props })} {...props}>
      {children}
    </button>
  );
}

// Separate hook for data fetching
function useUser(userId: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading };
}

// Composition at usage site
function UserProfile({ userId }: { userId: string }) {
  const { user, loading } = useUser(userId);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user</div>;

  return <Button>{user.name}</Button>;
}
```

**Benefits:**

- Button only handles rendering
- useUser only handles data fetching
- Easy to test independently
- Easy to reuse

---

## Open/Closed Principle (OCP)

**Definition:** Components should be open for extension, closed for modification.

### ❌ Violation: Modifying Component for New Cases

```typescript
// BAD: Adding new button types requires modifying component
function Button({ type, children }: { type: string; children: ReactNode }) {
  let icon = null;
  let className = button();

  // Modifying component for each new type
  if (type === "save") {
    icon = <SaveIcon />;
    className = button({ variant: "primary" });
  } else if (type === "delete") {
    icon = <DeleteIcon />;
    className = button({ variant: "danger" });
  } else if (type === "cancel") {
    icon = <CancelIcon />;
    className = button({ variant: "secondary" });
  }

  return (
    <button className={className}>
      {icon}
      {children}
    </button>
  );
}
```

**Problems:**

- Every new button type requires code change
- Growing if/else chain
- Violates open/closed principle

### ✅ Solution: Extend via Props/Composition

```typescript
// GOOD: Extend via props, don't modify component
export type ButtonProps = ComponentProps<"button"> &
  ButtonVariantProps & {
    icon?: ReactNode;
  };

function Button({ icon, children, ...props }: ButtonProps) {
  return (
    <button className={button({ ...props })} {...props}>
      {icon}
      {children}
    </button>
  );
}

// Extend via composition
function SaveButton({ children, ...props }: Omit<ButtonProps, "icon" | "variant">) {
  return (
    <Button icon={<SaveIcon />} variant="primary" {...props}>
      {children}
    </Button>
  );
}

function DeleteButton({ children, ...props }: Omit<ButtonProps, "icon" | "variant">) {
  return (
    <Button icon={<DeleteIcon />} variant="danger" {...props}>
      {children}
    </Button>
  );
}

// Usage: No changes to Button component needed
<SaveButton>Save</SaveButton>
<DeleteButton>Delete</DeleteButton>
```

**Benefits:**

- Button component never changes
- New button types via composition
- Type-safe extensions
- Easy to test

---

## Liskov Substitution Principle (LSP)

**Definition:** Subtypes must be substitutable for their base types without breaking behavior.

### ❌ Violation: Variant Changes Props Interface

```typescript
// BAD: Icon button requires different props than regular button
type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary" | "icon";
  children: ReactNode;
  icon?: ReactNode; // Required for icon variant, but not enforced
};

function Button({ variant, icon, children, ...props }: ButtonProps) {
  // Icon variant requires icon prop, but this isn't type-safe
  if (variant === "icon" && !icon) {
    throw new Error("Icon variant requires icon prop");
  }

  return (
    <button className={button({ variant })} {...props}>
      {variant === "icon" ? icon : children}
    </button>
  );
}

// Usage breaks at runtime
<Button variant="icon">Save</Button> // Runtime error!
```

**Problems:**

- Variants have different contracts
- Can't substitute variant="icon" for variant="primary"
- Runtime errors instead of compile-time safety

### ✅ Solution: Consistent Interface Across Variants

```typescript
// GOOD: All variants accept same base props
export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={button({ ...props })} {...props}>
      {children}
    </button>
  );
}

// Icon button is separate component with different contract
export type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: ReactNode; // Explicitly required
  "aria-label": string; // Required for accessibility
};

function IconButton({ icon, "aria-label": ariaLabel, ...props }: IconButtonProps) {
  return (
    <button
      className={button({ variant: "icon", ...props })}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}

// Usage is type-safe
<Button variant="primary">Save</Button> // ✅
<Button variant="secondary">Cancel</Button> // ✅
<IconButton icon={<SaveIcon />} aria-label="Save" /> // ✅
<IconButton icon={<SaveIcon />} /> // ❌ Compile error: missing aria-label
```

**Benefits:**

- Variants maintain interface contract
- Type-safe at compile time
- Clear separation of concerns
- No runtime surprises

---

## Interface Segregation Principle (ISP)

**Definition:** No component should depend on props it doesn't use.

### ❌ Violation: Unused Required Props

```typescript
// BAD: Component requires props it doesn't use
type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  icon: ReactNode; // Required but not always used
  tooltip: string; // Required but not always used
};

function Button({ variant, size, icon, tooltip, children, ...props }: ButtonProps) {
  // Button doesn't use icon or tooltip internally!
  return (
    <button className={button({ variant, size })} {...props}>
      {children}
    </button>
  );
}

// Usage: forced to provide unused props
<Button
  variant="primary"
  size="md"
  icon={null} // Doesn't use it!
  tooltip="" // Doesn't use it!
>
  Save
</Button>
```

**Problems:**

- Required props not used internally
- Consumers forced to provide unnecessary data
- Props interface is "fat"

### ✅ Solution: Required Props Must Be Used

```typescript
// GOOD: Only require props that are used
export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={button({ ...props })} {...props}>
      {children}
    </button>
  );
}

// Optional props for extensions
export type ButtonWithIconProps = ButtonProps & {
  icon?: ReactNode;
};

function ButtonWithIcon({ icon, children, ...props }: ButtonWithIconProps) {
  return (
    <Button {...props}>
      {icon}
      {children}
    </Button>
  );
}

// Usage: only provide what's needed
<Button variant="primary">Save</Button>
<ButtonWithIcon variant="primary" icon={<SaveIcon />}>Save</ButtonWithIcon>
```

**Benefits:**

- Required props are actually used
- Optional props are truly optional
- Lean interface
- No wasted props

---

## Dependency Inversion Principle (DIP)

**Definition:** Depend on abstractions (hooks, contexts), not concrete implementations.

### ❌ Violation: Direct Dependency on Concrete Implementation

```typescript
// BAD: Component directly imports and uses localStorage
import { lightTheme, darkTheme } from "./themes";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Direct dependency on localStorage
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Direct dependency on localStorage
    localStorage.setItem("theme", newTheme);
    // Direct dependency on document
    document.documentElement.className = newTheme;
  };

  return <Toggle checked={theme === "dark"} onChange={handleToggle} />;
}
```

**Problems:**

- Hardcoded dependency on localStorage
- Hardcoded dependency on document
- Can't test without mocking global objects
- Can't swap storage implementation

### ✅ Solution: Depend on Abstractions (Hooks/Contexts)

```typescript
// GOOD: Abstract storage behind hook
function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      // Handle error
    }
  };

  return [value, setStoredValue] as const;
}

// Abstract theme management behind hook
function useTheme() {
  const [theme, setStoredTheme] = useLocalStorage("theme", "light");

  const setTheme = (newTheme: "light" | "dark") => {
    setStoredTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  return { theme, setTheme };
}

// Component depends on abstraction, not implementation
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <Toggle checked={theme === "dark"} onChange={handleToggle} />;
}
```

**Benefits:**

- No direct dependency on localStorage
- Easy to test (mock useTheme)
- Easy to swap storage (useSessionStorage, useIndexedDB)
- Clean separation of concerns

---

## Minimal Changes Philosophy

**Principle:** Change only what's necessary, nothing more.

### ❌ Violation: Refactoring While Implementing

```typescript
// BAD: "Improving" existing code while adding new feature

// Task: Add dark mode toggle to settings
// File: src/components/Settings.tsx (existing file)

function Settings() {
  // UNNECESSARY: Refactoring existing state management
  // const [showAdvanced, setShowAdvanced] = useState(false); // OLD
  const { showAdvanced, toggleAdvanced } = useToggle(false); // NEW - not in plan!

  // NECESSARY: Adding dark mode toggle (in plan)
  const { theme, setTheme } = useTheme();

  // UNNECESSARY: Renaming variables "for consistency"
  // const handleSave = () => { ... }; // OLD
  const onSave = () => { ... }; // NEW - not in plan!

  // UNNECESSARY: Extracting existing logic to new component
  // return ( ... existing JSX ... ); // OLD
  return (
    <>
      <SettingsHeader /> {/* NEW - not in plan! */}
      <SettingsBody>
        {/* NECESSARY: New toggle */}
        <Toggle checked={theme === "dark"} onChange={() => setTheme(theme === "light" ? "dark" : "light")} />
      </SettingsBody>
    </>
  );
}
```

**Problems:**

- Refactored existing code (showAdvanced → useToggle)
- Renamed existing function (handleSave → onSave)
- Extracted existing UI (SettingsHeader, SettingsBody)
- Only dark mode toggle was in plan!

### ✅ Solution: Change Only What's In The Plan

```typescript
// GOOD: Only add dark mode toggle, don't touch existing code

// File: src/components/Settings.tsx (existing file)

function Settings() {
  // UNCHANGED: Existing state management
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ADDED: Dark mode toggle (in plan)
  const { theme, setTheme } = useTheme();

  // UNCHANGED: Existing handlers
  const handleSave = () => { ... };

  // UNCHANGED: Existing JSX structure
  return (
    <div className="settings">
      {/* UNCHANGED: Existing elements */}
      <h1>Settings</h1>

      {/* ADDED: Dark mode toggle (in plan) */}
      <div className="setting-item">
        <label>Dark Mode</label>
        <Toggle
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>

      {/* UNCHANGED: Rest of existing UI */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        Advanced
      </button>
    </div>
  );
}
```

**Benefits:**

- Only changed what plan requires
- No refactoring of working code
- Minimal diff, easy to review
- Lower risk of regressions

---

## Practical Checklist

### Before Writing Code

- [ ] Did I read the IMPLEMENTATION-PLAN.md acceptance criteria?
- [ ] Do I understand what needs to change?
- [ ] Am I tempted to refactor existing code?
- [ ] Are there any "bonus improvements" I want to make?

### While Writing Code

- [ ] Am I creating a new file or modifying an existing one?
- [ ] If modifying: Is this file listed in "Files to Modify"?
- [ ] Is my component doing one thing?
- [ ] Am I extending via props, not modifying logic?
- [ ] Do all variants have consistent interfaces?
- [ ] Are all required props actually used?
- [ ] Am I depending on abstractions (hooks), not implementations?

### After Writing Code

- [ ] Did I only change files in the plan?
- [ ] Did I avoid refactoring existing code?
- [ ] Did I follow existing patterns?
- [ ] Did I add any "bonus" features not in acceptance criteria?
- [ ] Can I justify every line of code I added?

---

## Summary

**SOLID in React/PandaCSS:**

- **Single Responsibility:** One component, one purpose
- **Open/Closed:** Extend via props/composition, don't modify
- **Liskov Substitution:** Variants maintain interface contract
- **Interface Segregation:** Required props must be used
- **Dependency Inversion:** Use hooks/context, not direct imports

**Minimal Changes:**

- Only modify files in plan
- Don't refactor existing code
- Follow existing patterns
- No "bonus" features

**When in Doubt:**

- Ask: "Does the plan require this change?"
- If no: Don't do it
- If yes: Do the minimal version

**Remember:** The goal is to implement what's specified, not to "improve" the codebase along the way.
