type Options = {
  length?: number; // Default: 16
  allows?: {
    allowLowerCase?: boolean; // Default: true
    allowUpperCase?: boolean; // Default: true
    allowNumbers?: boolean; // Default: true
    allowSpecialSymbols?: boolean; // Default: true
    allowDuplicates?: boolean; // Default: true
    allowSequentials?: boolean; // Default: true
  };
};

const generatePassword = (options?: Options): string => {
  const length = options?.length ?? 16;
  const allows = {
    allowLowerCase: true,
    allowUpperCase: true,
    allowNumbers: true,
    allowSpecialSymbols: true,
    allowDuplicates: true,
    allowSequentials: true,
    ...options?.allows,
  };

  let characters = '';
  if (allows.allowLowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (allows.allowUpperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (allows.allowNumbers) characters += '0123456789';
  if (allows.allowSpecialSymbols) characters += '!@#$%^&*()-_=+[]{}|;:\'",.<>/?`~';

  if (characters.length === 0 || length < 1 || (length > characters.length && !allows.allowDuplicates)) {
    throw new Error('Невозможно сгенерировать пароль с заданной конфигурацией.');
  }

  let password = '';
  const usedChars = new Set<string>();

  for (let i = 0; i < length; i++) {
    let char: string;

    do {
      const randomIndex = Math.floor(Math.random() * characters.length);
      char = characters[randomIndex];
    } while (
      (!allows.allowDuplicates && usedChars.has(char)) ||
      // eslint-disable-next-line no-unmodified-loop-condition
      (i > 0 && !allows.allowSequentials && password[i - 1] === char)
    );

    password += char;
    usedChars.add(char);
  }

  return password;
};

// =================== Тестирование ===================
const verifyPassword = (password: string, ops?: Options): boolean => {
  const config = {
    length: 16,
    ...ops,
    allows: {
      allowLowerCase: true,
      allowUpperCase: true,
      allowNumbers: true,
      allowSpecialSymbols: true,
      allowDuplicates: true,
      allowSequentials: true,
      ...ops?.allows,
    },
  };

  if (password.length !== config.length) {
    return false;
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  // Проверка наличия запрещенных символов
  if (!config.allows.allowLowerCase && hasLowercase) {
    return false;
  }
  if (!config.allows.allowUpperCase && hasUppercase) {
    return false;
  }
  if (!config.allows.allowNumbers && hasNumbers) {
    return false;
  }
  if (!config.allows.allowSpecialSymbols && hasSymbols) {
    return false;
  }

  // Проверка наличия дубликатов
  if (!config.allows.allowDuplicates) {
    const charSet = new Set<string>();
    for (const char of password) {
      if (charSet.has(char)) {
        return false;
      }
      charSet.add(char);
    }
  }

  // Проверка наличия последовательных символов
  if (!config.allows.allowSequentials) {
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        return false;
      }
    }
  }

  return true;
};

type ShouldThrowError = boolean;
const options: [Options | undefined, ShouldThrowError][] = [
  [undefined, false],
  [{ length: 12 }, false],
  [{ length: 1024 }, false],
  [{ allows: {} }, false],
  [{ allows: { allowLowerCase: false } }, false],
  [{ allows: { allowUpperCase: false } }, false],
  [{ allows: { allowNumbers: false } }, false],
  [{ allows: { allowSpecialSymbols: false } }, false],
  [{ allows: { allowDuplicates: false } }, false],
  [{ allows: { allowSequentials: false } }, false],
  [{ length: 1024, allows: { allowDuplicates: false } }, true],
  [{ length: 92, allows: { allowDuplicates: false } }, false],
  [
    {
      allows: {
        allowLowerCase: false,
        allowUpperCase: true,
        allowNumbers: false,
        allowSpecialSymbols: true,
        allowDuplicates: false,
        allowSequentials: false,
      },
    },
    false,
  ],
  [
    {
      length: 10,
      allows: {
        allowLowerCase: false,
        allowUpperCase: false,
        allowNumbers: true,
        allowSpecialSymbols: false,
        allowDuplicates: false,
        allowSequentials: false,
      },
    },
    false,
  ],
  [{ length: -1 }, true],
  [
    {
      allows: {
        allowLowerCase: false,
        allowUpperCase: false,
        allowNumbers: false,
        allowSpecialSymbols: false,
        allowDuplicates: false,
        allowSequentials: false,
      },
    },
    true,
  ],
  [
    {
      length: 12,
      allows: {
        allowLowerCase: false,
        allowUpperCase: false,
        allowNumbers: true,
        allowSpecialSymbols: false,
        allowDuplicates: false,
        allowSequentials: false,
      },
    },
    true,
  ],
];

for (let i = 0; i < options.length; i++) {
  const [option, shouldThrowError] = options[i];
  console.log(`=== Попытка №${i} ===`);

  let password: string;

  try {
    password = generatePassword(option);
  } catch (e) {
    if (!shouldThrowError) {
      throw Error('Генерация пароля кинула ошибку, хотя не должна была!');
    }

    console.log(`Пароль удовлетворяет критериям: Ожидаемая ошибка\n`);
    continue;
  }

  console.log(`Сгенерированный пароль: ${password}`);

  const isValid = verifyPassword(password, option);
  console.log(`Пароль удовлетворяет критериям: ${isValid}`);

  if (!isValid) {
    throw Error('Пароль не удовлетворяет критериям');
  }

  console.log('\n');
}

console.log('Поздравляю! Всё успешно!');
