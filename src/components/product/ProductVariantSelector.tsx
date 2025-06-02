import { useState, useEffect } from 'react';
import { ProductVariant } from '@/types/product';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  value?: string;
  onChange?: (variantId: string) => void;
  className?: string;
  label?: string;
  type?: 'default' | 'color' | 'button' | 'image';
  disabled?: boolean;
}

export function ProductVariantSelector({
  variants,
  value,
  onChange,
  className,
  label = 'Select an option',
  type = 'default',
  disabled = false,
}: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(value);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedVariant(value);
    }
  }, [value]);

  const handleChange = (variantId: string) => {
    setSelectedVariant(variantId);
    if (onChange) {
      onChange(variantId);
    }
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  // Group variants by name (e.g., 'Size', 'Color')
  const variantGroups = variants.reduce<Record<string, ProductVariant[]>>((acc, variant) => {
    if (!acc[variant.name]) {
      acc[variant.name] = [];
    }
    acc[variant.name].push(variant);
    return acc;
  }, {});

  return (
    <div className={cn('space-y-6', className)}>
      {Object.entries(variantGroups).map(([variantName, variantOptions]) => (
        <div key={variantName} className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            {variantName}
            {selectedVariant && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                {variantOptions.find((v) => v.id === selectedVariant)?.value}
              </span>
            )}
          </Label>
          
          <RadioGroup 
            value={selectedVariant} 
            onValueChange={handleChange}
            className={cn(
              'flex flex-wrap gap-2',
              type === 'color' && 'gap-3',
              type === 'button' && 'gap-2',
              type === 'image' && 'gap-3'
            )}
            disabled={disabled}
          >
            {variantOptions.map((variant) => {
              const isSelected = selectedVariant === variant.id;
              const isOutOfStock = variant.stock <= 0;
              
              if (type === 'color') {
                return (
                  <div key={variant.id} className="relative">
                    <RadioGroupItem
                      value={variant.id}
                      id={variant.id}
                      className="sr-only"
                      disabled={isOutOfStock || disabled}
                    />
                    <Label
                      htmlFor={variant.id}
                      className={cn(
                        'relative w-10 h-10 rounded-full border-2 cursor-pointer flex items-center justify-center',
                        'transition-all duration-200',
                        isSelected 
                          ? 'border-rose-500 ring-2 ring-offset-2 ring-rose-200' 
                          : 'border-gray-200 hover:border-gray-400',
                        isOutOfStock && 'opacity-50 cursor-not-allowed',
                        disabled && 'opacity-50 cursor-not-allowed'
                      )}
                      title={variant.value}
                    >
                      <span 
                        className="w-8 h-8 rounded-full" 
                        style={{ backgroundColor: variant.value.toLowerCase() }}
                      />
                      {isOutOfStock && (
                        <span className="sr-only">Out of stock</span>
                      )}
                    </Label>
                  </div>
                );
              }
              
              if (type === 'button') {
                return (
                  <div key={variant.id} className="relative">
                    <RadioGroupItem
                      value={variant.id}
                      id={variant.id}
                      className="sr-only"
                      disabled={isOutOfStock || disabled}
                    />
                    <Label
                      htmlFor={variant.id}
                      className={cn(
                        'px-4 py-2 border rounded-md text-sm font-medium cursor-pointer',
                        'transition-colors duration-200',
                        isSelected
                          ? 'bg-rose-50 border-rose-500 text-rose-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50',
                        isOutOfStock && 'opacity-50 cursor-not-allowed line-through',
                        disabled && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      {variant.value}
                      {isOutOfStock && (
                        <span className="sr-only"> (Out of stock)</span>
                      )}
                    </Label>
                  </div>
                );
              }
              
              if (type === 'image') {
                return (
                  <div key={variant.id} className="relative">
                    <RadioGroupItem
                      value={variant.id}
                      id={variant.id}
                      className="sr-only"
                      disabled={isOutOfStock || disabled}
                    />
                    <Label
                      htmlFor={variant.id}
                      className={cn(
                        'block w-16 h-16 rounded-md border-2 overflow-hidden cursor-pointer',
                        'transition-all duration-200',
                        isSelected 
                          ? 'border-rose-500 ring-2 ring-offset-1 ring-rose-200' 
                          : 'border-gray-200 hover:border-gray-400',
                        isOutOfStock && 'opacity-50 cursor-not-allowed',
                        disabled && 'opacity-50 cursor-not-allowed'
                      )}
                      title={variant.value}
                    >
                      <img 
                        src={variant.value} // Assuming value is an image URL for image type
                        alt={variant.value}
                        className="w-full h-full object-cover"
                      />
                      {isOutOfStock && (
                        <span className="sr-only">Out of stock</span>
                      )}
                    </Label>
                  </div>
                );
              }
              
              // Default radio button style
              return (
                <div key={variant.id} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={variant.id} 
                    id={variant.id} 
                    disabled={isOutOfStock || disabled}
                    className={cn(
                      isOutOfStock && 'opacity-50',
                      disabled && 'opacity-50'
                    )}
                  />
                  <Label 
                    htmlFor={variant.id} 
                    className={cn(
                      'text-sm font-normal',
                      isOutOfStock && 'text-gray-400',
                      disabled && 'text-gray-400',
                      isOutOfStock && 'line-through'
                    )}
                  >
                    {variant.value}
                    {variant.price && (
                      <span className="ml-1 text-xs text-gray-500">
                        (+{variant.price.toFixed(2)})
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="ml-1 text-xs text-rose-500">(Out of stock)</span>
                    )}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
