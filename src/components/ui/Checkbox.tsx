import {
  Checkbox as GluestackCheckbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";

type CheckboxProps = {
  size?: "sm" | "md" | "lg";
  isInvalid?: boolean;
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
  value?: any;
  ariaLabel?: string;
  label?: string;
};

{
  /* <Checkbox
isChecked={checked}
onChange={() => setChecked(!checked)}
ariaLabel="checkbox"
/> */
}

const Checkbox = ({
  size = "md",
  isInvalid = false,
  isChecked = false,
  onChange,
  value,
  ariaLabel,
  label,
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
      <CheckboxLabel
        color={colors.subText}
        fontSize={14}
        fontFamily="Urbanist-Medium"
      >
        {label}
      </CheckboxLabel>
    </GluestackCheckbox>
  );
};

export default Checkbox;
