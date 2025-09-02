// "use client";

// import { useAuth } from "@/components/AuthContext";
// import EducationalWebsite from "@/components/homeComponents";
// import Wrapper from "../Layout/Wrapper/Wrapper";
// export default function HomePage(): JSX.Element {
//   const { isLoggedIn } = useAuth();

//   return (
//     <Wrapper>
//       {isLoggedIn ? (
//       <EducationalWebsite />
//       ) : (
//         <EducationalWebsite />
//       )}
//     </Wrapper>
//   );
// }


"use client";

import { useAuth } from "@/components/AuthContext";
import EducationalWebsite from "@/components/homeComponents";
import Wrapper from "@/Layout/Wrapper/Wrapper";

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <Wrapper>
      <EducationalWebsite />
    </Wrapper>
  );
}
