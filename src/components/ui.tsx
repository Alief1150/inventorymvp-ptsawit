import { cloneElement, isValidElement, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive';
  asChild?: boolean;
};

export function Button({ className, variant = 'default', asChild, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
    ghost: 'bg-transparent text-slate-200 hover:bg-slate-800',
    destructive: 'bg-red-500 text-white hover:bg-red-400'
  };
  const classes = cn(base, variants[variant], className);

  if (asChild) {
    const child = props.children;
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (child.props as { className?: string }).className)
      });
    }
    return <span className={classes}>{child}</span>;
  }

  return <button className={classes} {...props} />;
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('rounded-3xl border border-slate-800 bg-slate-950/70 shadow-glow', className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('border-b border-slate-800 px-5 py-4', className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('text-base font-semibold text-slate-50', className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('mt-1 text-sm text-slate-400', className)}>{children}</p>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>;
}

export function Badge({ className, children, tone = 'default' }: { className?: string; children: ReactNode; tone?: 'default' | 'warning' | 'success' | 'destructive' | 'muted' }) {
  const tones = {
    default: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/20',
    warning: 'bg-amber-400/15 text-amber-300 border-amber-400/20',
    success: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/20',
    destructive: 'bg-red-400/15 text-red-300 border-red-400/20',
    muted: 'bg-slate-800 text-slate-300 border-slate-700'
  } as const;
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', tones[tone], className)}>{children}</span>;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('h-11 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400', className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('min-h-28 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400', className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return <select className={cn('h-11 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:border-cyan-400', className)} {...props}>{children}</select>;
}

export function Label({ className, children, htmlFor }: { className?: string; children: ReactNode; htmlFor?: string }) {
  return <label htmlFor={htmlFor} className={cn('mb-2 block text-sm font-medium text-slate-200', className)}>{children}</label>;
}

export function Separator() {
  return <div className="h-px w-full bg-slate-800" />;
}

export function AppLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-sm text-cyan-300 hover:text-cyan-200">{children}</Link>;
}
