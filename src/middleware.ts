import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const stepRequirements: Record<string, string> = {
  "step-two": "step1-done",
  "step-three": "step2-done",
  "step-four": "step3-done"
};

const numberToWord: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four"
};

const wordToNumber: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const currentPath = url.pathname;
  const pathSegments = currentPath.split("/");
  const currentStep = pathSegments[pathSegments.length - 1];

  if (
    currentPath === "/transaction/new" ||
    currentPath === "/transaction/new/"
  ) {
    url.pathname = "/transaction/new/step-one";
    return NextResponse.redirect(url);
  }

  const requiredCookie = stepRequirements[currentStep];

  if (requiredCookie) {
    const isRequiredStepDone =
      request.cookies.get(requiredCookie)?.value === "true";

    if (!isRequiredStepDone) {
      const currentStepWord = currentStep.split("-")[1];

      const currentStepNumber = wordToNumber[currentStepWord];
      const previousStepNumber = currentStepNumber - 1;

      const previousStepWord = numberToWord[previousStepNumber];

      url.pathname = `/transaction/new/step-${previousStepWord}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/transaction/new", "/transaction/new/:path*"]
};
