import {
  Checkbox as GluestackCheckbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
} from "@gluestack-ui/themed";

type CheckboxProps = {
  size?: "sm" | "md" | "lg";
  isInvalid?: boolean;
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
  value?: any;
  ariaLabel?: string;
};

const Checkbox = ({
  size = "md",
  isInvalid = false,
  isChecked = false,
  onChange,
  value,
  ariaLabel,
}: CheckboxProps) => {
  return (
    <GluestackCheckbox
      size={size}
      isInvalid={isInvalid}
      isChecked={isChecked}
      onChange={onChange}
      value={value}
      aria-label={ariaLabel}
    >
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
    </GluestackCheckbox>
  );
};

export default Checkbox;
