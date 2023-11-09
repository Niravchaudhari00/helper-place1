import { useEffect } from "react";
import Logo from "../assets/logo";
import { useAnimate, usePresence } from "framer-motion";

const LogoStype = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1 });
        await animate("li", { opacity: 1, x: 0 });
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate("li", { opacity: 0, x: -100 });
        await animate(scope.current, { opacity: 0 });
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    // <p
    //   style={{
    //     fontSize: "12px",
    //     margin: 0,
    //     overflow: "hidden",
    //     textOverflow: "ellipsis",
    //     whiteSpace: "nowrap",
    //     display: "flex",
    //     alignItems: "center",
    //     gap: 3,
    //   }}
    // >
    //   <Logo height={20} width={100} />
    // </p>
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  );
};

export default LogoStype;
