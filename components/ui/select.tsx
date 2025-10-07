'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger>;

const SelectTrigger = ({ className, children, ...props }: SelectTriggerProps) => (
    <SelectPrimitive.Trigger
        className={cn(
            'border-input ring-offset-background focus:ring-ring data-[placeholder]:text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-9 w-full cursor-pointer items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className,
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
);
SelectTrigger.displayName = 'SelectTrigger';

type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>;

const SelectScrollUpButton = ({ className, ...props }: SelectScrollUpButtonProps) => (
    <SelectPrimitive.ScrollUpButton
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
);
SelectScrollUpButton.displayName = 'SelectScrollUpButton';

type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>;

const SelectScrollDownButton = ({ className, ...props }: SelectScrollDownButtonProps) => (
    <SelectPrimitive.ScrollDownButton
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
);
SelectScrollDownButton.displayName = 'SelectScrollDownButton';

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>;

const SelectContent = ({
    className,
    children,
    position = 'popper',
    ...props
}: SelectContentProps) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            className={cn(
                'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
                position === 'popper' &&
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className,
            )}
            position={position}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn(
                    'p-1',
                    position === 'popper' &&
                        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
);
SelectContent.displayName = 'SelectContent';

type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;

const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
    <SelectPrimitive.Label
        className={cn('px-2 py-1.5 text-sm font-semibold', className)}
        {...props}
    />
);
SelectLabel.displayName = 'SelectLabel';

type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;

const SelectItem = ({ className, children, ...props }: SelectItemProps) => (
    <SelectPrimitive.Item
        className={cn(
            'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        )}
        {...props}
    >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
);
SelectItem.displayName = 'SelectItem';

type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>;

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
    <SelectPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
);
SelectSeparator.displayName = 'SelectSeparator';

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
