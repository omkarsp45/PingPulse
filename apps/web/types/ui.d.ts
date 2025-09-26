// Fix for UI component type issues
declare module '@/components/ui/dialog' {
  import { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';
  import * as DialogPrimitive from '@radix-ui/react-dialog';

  const Dialog: typeof DialogPrimitive.Root;
  
  interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    children?: ReactNode;
    className?: string;
  }
  
  const DialogContent: React.ForwardRefExoticComponent<DialogContentProps>;
  
  interface DialogHeaderProps {
    children?: ReactNode;
    className?: string;
  }
  
  const DialogHeader: React.FC<DialogHeaderProps>;
  
  interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
    children?: ReactNode;
    className?: string;
  }
  
  const DialogTitle: React.ForwardRefExoticComponent<DialogTitleProps>;
  
  export {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  };
}

declare module '@/components/ui/button' {
  import { ButtonHTMLAttributes, ReactNode } from 'react';
  import { VariantProps } from 'class-variance-authority';

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }

  const Button: React.ForwardRefExoticComponent<ButtonProps>;
  export { Button };
}

declare module '@/components/ui/input' {
  import { InputHTMLAttributes } from 'react';

  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }

  const Input: React.ForwardRefExoticComponent<InputProps>;
  export { Input };
}

declare module '@/components/ui/label' {
  import { LabelHTMLAttributes, ReactNode } from 'react';

  interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children?: ReactNode;
    className?: string;
  }

  const Label: React.ForwardRefExoticComponent<LabelProps>;
  export { Label };
}

declare module '@/components/ui/card' {
  import { HTMLAttributes, ReactNode } from 'react';

  interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
  }

  interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
  }

  interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
    className?: string;
  }

  interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
    className?: string;
  }

  interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
  }

  interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
  }

  const Card: React.ForwardRefExoticComponent<CardProps>;
  const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps>;
  const CardTitle: React.ForwardRefExoticComponent<CardTitleProps>;
  const CardDescription: React.ForwardRefExoticComponent<CardDescriptionProps>;
  const CardContent: React.ForwardRefExoticComponent<CardContentProps>;
  const CardFooter: React.ForwardRefExoticComponent<CardFooterProps>;

  export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  };
}

declare module '@/components/ui/badge' {
  import { HTMLAttributes, ReactNode } from 'react';

  interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }

  const Badge: React.ForwardRefExoticComponent<BadgeProps>;
  export { Badge };
}
