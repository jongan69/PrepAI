
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * Users come from Clerk, but we mirror them locally
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model HealthProfile
 * Health profile holds user settings and preferences
 */
export type HealthProfile = $Result.DefaultSelection<Prisma.$HealthProfilePayload>
/**
 * Model Workout
 * Workouts with categories and types
 */
export type Workout = $Result.DefaultSelection<Prisma.$WorkoutPayload>
/**
 * Model Exercise
 * Exercises per workout with detailed tracking
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>
/**
 * Model Meal
 * Meals with meal types
 */
export type Meal = $Result.DefaultSelection<Prisma.$MealPayload>
/**
 * Model MealItem
 * Individual food items within meals
 */
export type MealItem = $Result.DefaultSelection<Prisma.$MealItemPayload>
/**
 * Model ProgressLog
 * Daily progress logs (hydration, sleep, mood, weight tracking)
 */
export type ProgressLog = $Result.DefaultSelection<Prisma.$ProgressLogPayload>
/**
 * Model WeightEntry
 * Individual weight entries with photos and notes
 */
export type WeightEntry = $Result.DefaultSelection<Prisma.$WeightEntryPayload>
/**
 * Model WaterIntake
 * Individual water intake entries
 */
export type WaterIntake = $Result.DefaultSelection<Prisma.$WaterIntakePayload>
/**
 * Model SleepEntry
 * Individual sleep entries with quality tracking
 */
export type SleepEntry = $Result.DefaultSelection<Prisma.$SleepEntryPayload>
/**
 * Model Goal
 * User goals and targets
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.healthProfile`: Exposes CRUD operations for the **HealthProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HealthProfiles
    * const healthProfiles = await prisma.healthProfile.findMany()
    * ```
    */
  get healthProfile(): Prisma.HealthProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workout`: Exposes CRUD operations for the **Workout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workouts
    * const workouts = await prisma.workout.findMany()
    * ```
    */
  get workout(): Prisma.WorkoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meal`: Exposes CRUD operations for the **Meal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meals
    * const meals = await prisma.meal.findMany()
    * ```
    */
  get meal(): Prisma.MealDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mealItem`: Exposes CRUD operations for the **MealItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealItems
    * const mealItems = await prisma.mealItem.findMany()
    * ```
    */
  get mealItem(): Prisma.MealItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progressLog`: Exposes CRUD operations for the **ProgressLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgressLogs
    * const progressLogs = await prisma.progressLog.findMany()
    * ```
    */
  get progressLog(): Prisma.ProgressLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weightEntry`: Exposes CRUD operations for the **WeightEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeightEntries
    * const weightEntries = await prisma.weightEntry.findMany()
    * ```
    */
  get weightEntry(): Prisma.WeightEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.waterIntake`: Exposes CRUD operations for the **WaterIntake** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WaterIntakes
    * const waterIntakes = await prisma.waterIntake.findMany()
    * ```
    */
  get waterIntake(): Prisma.WaterIntakeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sleepEntry`: Exposes CRUD operations for the **SleepEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SleepEntries
    * const sleepEntries = await prisma.sleepEntry.findMany()
    * ```
    */
  get sleepEntry(): Prisma.SleepEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    HealthProfile: 'HealthProfile',
    Workout: 'Workout',
    Exercise: 'Exercise',
    Meal: 'Meal',
    MealItem: 'MealItem',
    ProgressLog: 'ProgressLog',
    WeightEntry: 'WeightEntry',
    WaterIntake: 'WaterIntake',
    SleepEntry: 'SleepEntry',
    Goal: 'Goal'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "healthProfile" | "workout" | "exercise" | "meal" | "mealItem" | "progressLog" | "weightEntry" | "waterIntake" | "sleepEntry" | "goal"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      HealthProfile: {
        payload: Prisma.$HealthProfilePayload<ExtArgs>
        fields: Prisma.HealthProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          findFirst: {
            args: Prisma.HealthProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          findMany: {
            args: Prisma.HealthProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>[]
          }
          create: {
            args: Prisma.HealthProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          createMany: {
            args: Prisma.HealthProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>[]
          }
          delete: {
            args: Prisma.HealthProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          update: {
            args: Prisma.HealthProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          deleteMany: {
            args: Prisma.HealthProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>[]
          }
          upsert: {
            args: Prisma.HealthProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          aggregate: {
            args: Prisma.HealthProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealthProfile>
          }
          groupBy: {
            args: Prisma.HealthProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthProfileCountArgs<ExtArgs>
            result: $Utils.Optional<HealthProfileCountAggregateOutputType> | number
          }
        }
      }
      Workout: {
        payload: Prisma.$WorkoutPayload<ExtArgs>
        fields: Prisma.WorkoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          findFirst: {
            args: Prisma.WorkoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          findMany: {
            args: Prisma.WorkoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[]
          }
          create: {
            args: Prisma.WorkoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          createMany: {
            args: Prisma.WorkoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[]
          }
          delete: {
            args: Prisma.WorkoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          update: {
            args: Prisma.WorkoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          deleteMany: {
            args: Prisma.WorkoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[]
          }
          upsert: {
            args: Prisma.WorkoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          aggregate: {
            args: Prisma.WorkoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkout>
          }
          groupBy: {
            args: Prisma.WorkoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutCountAggregateOutputType> | number
          }
        }
      }
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
      Meal: {
        payload: Prisma.$MealPayload<ExtArgs>
        fields: Prisma.MealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          findFirst: {
            args: Prisma.MealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          findMany: {
            args: Prisma.MealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>[]
          }
          create: {
            args: Prisma.MealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          createMany: {
            args: Prisma.MealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>[]
          }
          delete: {
            args: Prisma.MealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          update: {
            args: Prisma.MealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          deleteMany: {
            args: Prisma.MealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>[]
          }
          upsert: {
            args: Prisma.MealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          aggregate: {
            args: Prisma.MealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeal>
          }
          groupBy: {
            args: Prisma.MealGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealCountArgs<ExtArgs>
            result: $Utils.Optional<MealCountAggregateOutputType> | number
          }
        }
      }
      MealItem: {
        payload: Prisma.$MealItemPayload<ExtArgs>
        fields: Prisma.MealItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          findFirst: {
            args: Prisma.MealItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          findMany: {
            args: Prisma.MealItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>[]
          }
          create: {
            args: Prisma.MealItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          createMany: {
            args: Prisma.MealItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>[]
          }
          delete: {
            args: Prisma.MealItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          update: {
            args: Prisma.MealItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          deleteMany: {
            args: Prisma.MealItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>[]
          }
          upsert: {
            args: Prisma.MealItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          aggregate: {
            args: Prisma.MealItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealItem>
          }
          groupBy: {
            args: Prisma.MealItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealItemCountArgs<ExtArgs>
            result: $Utils.Optional<MealItemCountAggregateOutputType> | number
          }
        }
      }
      ProgressLog: {
        payload: Prisma.$ProgressLogPayload<ExtArgs>
        fields: Prisma.ProgressLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgressLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgressLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>
          }
          findFirst: {
            args: Prisma.ProgressLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgressLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>
          }
          findMany: {
            args: Prisma.ProgressLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>[]
          }
          create: {
            args: Prisma.ProgressLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>
          }
          createMany: {
            args: Prisma.ProgressLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgressLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>[]
          }
          delete: {
            args: Prisma.ProgressLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>
          }
          update: {
            args: Prisma.ProgressLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>
          }
          deleteMany: {
            args: Prisma.ProgressLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgressLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgressLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>[]
          }
          upsert: {
            args: Prisma.ProgressLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressLogPayload>
          }
          aggregate: {
            args: Prisma.ProgressLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgressLog>
          }
          groupBy: {
            args: Prisma.ProgressLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgressLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgressLogCountArgs<ExtArgs>
            result: $Utils.Optional<ProgressLogCountAggregateOutputType> | number
          }
        }
      }
      WeightEntry: {
        payload: Prisma.$WeightEntryPayload<ExtArgs>
        fields: Prisma.WeightEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeightEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeightEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>
          }
          findFirst: {
            args: Prisma.WeightEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeightEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>
          }
          findMany: {
            args: Prisma.WeightEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>[]
          }
          create: {
            args: Prisma.WeightEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>
          }
          createMany: {
            args: Prisma.WeightEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeightEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>[]
          }
          delete: {
            args: Prisma.WeightEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>
          }
          update: {
            args: Prisma.WeightEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>
          }
          deleteMany: {
            args: Prisma.WeightEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeightEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeightEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>[]
          }
          upsert: {
            args: Prisma.WeightEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightEntryPayload>
          }
          aggregate: {
            args: Prisma.WeightEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeightEntry>
          }
          groupBy: {
            args: Prisma.WeightEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeightEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeightEntryCountArgs<ExtArgs>
            result: $Utils.Optional<WeightEntryCountAggregateOutputType> | number
          }
        }
      }
      WaterIntake: {
        payload: Prisma.$WaterIntakePayload<ExtArgs>
        fields: Prisma.WaterIntakeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WaterIntakeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WaterIntakeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>
          }
          findFirst: {
            args: Prisma.WaterIntakeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WaterIntakeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>
          }
          findMany: {
            args: Prisma.WaterIntakeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>[]
          }
          create: {
            args: Prisma.WaterIntakeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>
          }
          createMany: {
            args: Prisma.WaterIntakeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WaterIntakeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>[]
          }
          delete: {
            args: Prisma.WaterIntakeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>
          }
          update: {
            args: Prisma.WaterIntakeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>
          }
          deleteMany: {
            args: Prisma.WaterIntakeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WaterIntakeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WaterIntakeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>[]
          }
          upsert: {
            args: Prisma.WaterIntakeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterIntakePayload>
          }
          aggregate: {
            args: Prisma.WaterIntakeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWaterIntake>
          }
          groupBy: {
            args: Prisma.WaterIntakeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WaterIntakeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WaterIntakeCountArgs<ExtArgs>
            result: $Utils.Optional<WaterIntakeCountAggregateOutputType> | number
          }
        }
      }
      SleepEntry: {
        payload: Prisma.$SleepEntryPayload<ExtArgs>
        fields: Prisma.SleepEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SleepEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SleepEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>
          }
          findFirst: {
            args: Prisma.SleepEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SleepEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>
          }
          findMany: {
            args: Prisma.SleepEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>[]
          }
          create: {
            args: Prisma.SleepEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>
          }
          createMany: {
            args: Prisma.SleepEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SleepEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>[]
          }
          delete: {
            args: Prisma.SleepEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>
          }
          update: {
            args: Prisma.SleepEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>
          }
          deleteMany: {
            args: Prisma.SleepEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SleepEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SleepEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>[]
          }
          upsert: {
            args: Prisma.SleepEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepEntryPayload>
          }
          aggregate: {
            args: Prisma.SleepEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSleepEntry>
          }
          groupBy: {
            args: Prisma.SleepEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SleepEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.SleepEntryCountArgs<ExtArgs>
            result: $Utils.Optional<SleepEntryCountAggregateOutputType> | number
          }
        }
      }
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    healthProfile?: HealthProfileOmit
    workout?: WorkoutOmit
    exercise?: ExerciseOmit
    meal?: MealOmit
    mealItem?: MealItemOmit
    progressLog?: ProgressLogOmit
    weightEntry?: WeightEntryOmit
    waterIntake?: WaterIntakeOmit
    sleepEntry?: SleepEntryOmit
    goal?: GoalOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    healthProfiles: number
    workouts: number
    meals: number
    mealItems: number
    progressLogs: number
    weightEntries: number
    waterIntake: number
    sleepEntries: number
    goals: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthProfiles?: boolean | UserCountOutputTypeCountHealthProfilesArgs
    workouts?: boolean | UserCountOutputTypeCountWorkoutsArgs
    meals?: boolean | UserCountOutputTypeCountMealsArgs
    mealItems?: boolean | UserCountOutputTypeCountMealItemsArgs
    progressLogs?: boolean | UserCountOutputTypeCountProgressLogsArgs
    weightEntries?: boolean | UserCountOutputTypeCountWeightEntriesArgs
    waterIntake?: boolean | UserCountOutputTypeCountWaterIntakeArgs
    sleepEntries?: boolean | UserCountOutputTypeCountSleepEntriesArgs
    goals?: boolean | UserCountOutputTypeCountGoalsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHealthProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthProfileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMealItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgressLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWeightEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWaterIntakeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaterIntakeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSleepEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SleepEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
  }


  /**
   * Count Type WorkoutCountOutputType
   */

  export type WorkoutCountOutputType = {
    exercises: number
  }

  export type WorkoutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercises?: boolean | WorkoutCountOutputTypeCountExercisesArgs
  }

  // Custom InputTypes
  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutCountOutputType
     */
    select?: WorkoutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeCountExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }


  /**
   * Count Type MealCountOutputType
   */

  export type MealCountOutputType = {
    mealItems: number
  }

  export type MealCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealItems?: boolean | MealCountOutputTypeCountMealItemsArgs
  }

  // Custom InputTypes
  /**
   * MealCountOutputType without action
   */
  export type MealCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCountOutputType
     */
    select?: MealCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MealCountOutputType without action
   */
  export type MealCountOutputTypeCountMealItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    name: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkId: string
    name: string | null
    email: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthProfiles?: boolean | User$healthProfilesArgs<ExtArgs>
    workouts?: boolean | User$workoutsArgs<ExtArgs>
    meals?: boolean | User$mealsArgs<ExtArgs>
    mealItems?: boolean | User$mealItemsArgs<ExtArgs>
    progressLogs?: boolean | User$progressLogsArgs<ExtArgs>
    weightEntries?: boolean | User$weightEntriesArgs<ExtArgs>
    waterIntake?: boolean | User$waterIntakeArgs<ExtArgs>
    sleepEntries?: boolean | User$sleepEntriesArgs<ExtArgs>
    goals?: boolean | User$goalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkId" | "name" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthProfiles?: boolean | User$healthProfilesArgs<ExtArgs>
    workouts?: boolean | User$workoutsArgs<ExtArgs>
    meals?: boolean | User$mealsArgs<ExtArgs>
    mealItems?: boolean | User$mealItemsArgs<ExtArgs>
    progressLogs?: boolean | User$progressLogsArgs<ExtArgs>
    weightEntries?: boolean | User$weightEntriesArgs<ExtArgs>
    waterIntake?: boolean | User$waterIntakeArgs<ExtArgs>
    sleepEntries?: boolean | User$sleepEntriesArgs<ExtArgs>
    goals?: boolean | User$goalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      healthProfiles: Prisma.$HealthProfilePayload<ExtArgs>[]
      workouts: Prisma.$WorkoutPayload<ExtArgs>[]
      meals: Prisma.$MealPayload<ExtArgs>[]
      mealItems: Prisma.$MealItemPayload<ExtArgs>[]
      progressLogs: Prisma.$ProgressLogPayload<ExtArgs>[]
      weightEntries: Prisma.$WeightEntryPayload<ExtArgs>[]
      waterIntake: Prisma.$WaterIntakePayload<ExtArgs>[]
      sleepEntries: Prisma.$SleepEntryPayload<ExtArgs>[]
      goals: Prisma.$GoalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string
      name: string | null
      email: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    healthProfiles<T extends User$healthProfilesArgs<ExtArgs> = {}>(args?: Subset<T, User$healthProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workouts<T extends User$workoutsArgs<ExtArgs> = {}>(args?: Subset<T, User$workoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    meals<T extends User$mealsArgs<ExtArgs> = {}>(args?: Subset<T, User$mealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mealItems<T extends User$mealItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$mealItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progressLogs<T extends User$progressLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$progressLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weightEntries<T extends User$weightEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$weightEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    waterIntake<T extends User$waterIntakeArgs<ExtArgs> = {}>(args?: Subset<T, User$waterIntakeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sleepEntries<T extends User$sleepEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$sleepEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    goals<T extends User$goalsArgs<ExtArgs> = {}>(args?: Subset<T, User$goalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.healthProfiles
   */
  export type User$healthProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    where?: HealthProfileWhereInput
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    cursor?: HealthProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * User.workouts
   */
  export type User$workoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    where?: WorkoutWhereInput
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    cursor?: WorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * User.meals
   */
  export type User$mealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    where?: MealWhereInput
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    cursor?: MealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * User.mealItems
   */
  export type User$mealItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    where?: MealItemWhereInput
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    cursor?: MealItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * User.progressLogs
   */
  export type User$progressLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    where?: ProgressLogWhereInput
    orderBy?: ProgressLogOrderByWithRelationInput | ProgressLogOrderByWithRelationInput[]
    cursor?: ProgressLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgressLogScalarFieldEnum | ProgressLogScalarFieldEnum[]
  }

  /**
   * User.weightEntries
   */
  export type User$weightEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    where?: WeightEntryWhereInput
    orderBy?: WeightEntryOrderByWithRelationInput | WeightEntryOrderByWithRelationInput[]
    cursor?: WeightEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeightEntryScalarFieldEnum | WeightEntryScalarFieldEnum[]
  }

  /**
   * User.waterIntake
   */
  export type User$waterIntakeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    where?: WaterIntakeWhereInput
    orderBy?: WaterIntakeOrderByWithRelationInput | WaterIntakeOrderByWithRelationInput[]
    cursor?: WaterIntakeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WaterIntakeScalarFieldEnum | WaterIntakeScalarFieldEnum[]
  }

  /**
   * User.sleepEntries
   */
  export type User$sleepEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    where?: SleepEntryWhereInput
    orderBy?: SleepEntryOrderByWithRelationInput | SleepEntryOrderByWithRelationInput[]
    cursor?: SleepEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SleepEntryScalarFieldEnum | SleepEntryScalarFieldEnum[]
  }

  /**
   * User.goals
   */
  export type User$goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    cursor?: GoalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model HealthProfile
   */

  export type AggregateHealthProfile = {
    _count: HealthProfileCountAggregateOutputType | null
    _avg: HealthProfileAvgAggregateOutputType | null
    _sum: HealthProfileSumAggregateOutputType | null
    _min: HealthProfileMinAggregateOutputType | null
    _max: HealthProfileMaxAggregateOutputType | null
  }

  export type HealthProfileAvgAggregateOutputType = {
    height: number | null
    weight: number | null
    age: number | null
    targetWeight: number | null
    targetCalories: number | null
    targetWaterL: number | null
  }

  export type HealthProfileSumAggregateOutputType = {
    height: number | null
    weight: number | null
    age: number | null
    targetWeight: number | null
    targetCalories: number | null
    targetWaterL: number | null
  }

  export type HealthProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    height: number | null
    weight: number | null
    age: number | null
    gender: string | null
    birthday: Date | null
    targetWeight: number | null
    targetCalories: number | null
    targetWaterL: number | null
    activityLevel: string | null
    fitnessGoal: string | null
    heightUnit: string | null
    weightUnit: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type HealthProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    height: number | null
    weight: number | null
    age: number | null
    gender: string | null
    birthday: Date | null
    targetWeight: number | null
    targetCalories: number | null
    targetWaterL: number | null
    activityLevel: string | null
    fitnessGoal: string | null
    heightUnit: string | null
    weightUnit: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type HealthProfileCountAggregateOutputType = {
    id: number
    userId: number
    height: number
    weight: number
    age: number
    gender: number
    birthday: number
    targetWeight: number
    targetCalories: number
    targetWaterL: number
    activityLevel: number
    fitnessGoal: number
    heightUnit: number
    weightUnit: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type HealthProfileAvgAggregateInputType = {
    height?: true
    weight?: true
    age?: true
    targetWeight?: true
    targetCalories?: true
    targetWaterL?: true
  }

  export type HealthProfileSumAggregateInputType = {
    height?: true
    weight?: true
    age?: true
    targetWeight?: true
    targetCalories?: true
    targetWaterL?: true
  }

  export type HealthProfileMinAggregateInputType = {
    id?: true
    userId?: true
    height?: true
    weight?: true
    age?: true
    gender?: true
    birthday?: true
    targetWeight?: true
    targetCalories?: true
    targetWaterL?: true
    activityLevel?: true
    fitnessGoal?: true
    heightUnit?: true
    weightUnit?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type HealthProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    height?: true
    weight?: true
    age?: true
    gender?: true
    birthday?: true
    targetWeight?: true
    targetCalories?: true
    targetWaterL?: true
    activityLevel?: true
    fitnessGoal?: true
    heightUnit?: true
    weightUnit?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type HealthProfileCountAggregateInputType = {
    id?: true
    userId?: true
    height?: true
    weight?: true
    age?: true
    gender?: true
    birthday?: true
    targetWeight?: true
    targetCalories?: true
    targetWaterL?: true
    activityLevel?: true
    fitnessGoal?: true
    heightUnit?: true
    weightUnit?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type HealthProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthProfile to aggregate.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HealthProfiles
    **/
    _count?: true | HealthProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HealthProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HealthProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthProfileMaxAggregateInputType
  }

  export type GetHealthProfileAggregateType<T extends HealthProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateHealthProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealthProfile[P]>
      : GetScalarType<T[P], AggregateHealthProfile[P]>
  }




  export type HealthProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthProfileWhereInput
    orderBy?: HealthProfileOrderByWithAggregationInput | HealthProfileOrderByWithAggregationInput[]
    by: HealthProfileScalarFieldEnum[] | HealthProfileScalarFieldEnum
    having?: HealthProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthProfileCountAggregateInputType | true
    _avg?: HealthProfileAvgAggregateInputType
    _sum?: HealthProfileSumAggregateInputType
    _min?: HealthProfileMinAggregateInputType
    _max?: HealthProfileMaxAggregateInputType
  }

  export type HealthProfileGroupByOutputType = {
    id: string
    userId: string
    height: number | null
    weight: number | null
    age: number | null
    gender: string | null
    birthday: Date | null
    targetWeight: number | null
    targetCalories: number | null
    targetWaterL: number | null
    activityLevel: string | null
    fitnessGoal: string | null
    heightUnit: string | null
    weightUnit: string | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: HealthProfileCountAggregateOutputType | null
    _avg: HealthProfileAvgAggregateOutputType | null
    _sum: HealthProfileSumAggregateOutputType | null
    _min: HealthProfileMinAggregateOutputType | null
    _max: HealthProfileMaxAggregateOutputType | null
  }

  type GetHealthProfileGroupByPayload<T extends HealthProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthProfileGroupByOutputType[P]>
            : GetScalarType<T[P], HealthProfileGroupByOutputType[P]>
        }
      >
    >


  export type HealthProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    birthday?: boolean
    targetWeight?: boolean
    targetCalories?: boolean
    targetWaterL?: boolean
    activityLevel?: boolean
    fitnessGoal?: boolean
    heightUnit?: boolean
    weightUnit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthProfile"]>

  export type HealthProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    birthday?: boolean
    targetWeight?: boolean
    targetCalories?: boolean
    targetWaterL?: boolean
    activityLevel?: boolean
    fitnessGoal?: boolean
    heightUnit?: boolean
    weightUnit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthProfile"]>

  export type HealthProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    birthday?: boolean
    targetWeight?: boolean
    targetCalories?: boolean
    targetWaterL?: boolean
    activityLevel?: boolean
    fitnessGoal?: boolean
    heightUnit?: boolean
    weightUnit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthProfile"]>

  export type HealthProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    birthday?: boolean
    targetWeight?: boolean
    targetCalories?: boolean
    targetWaterL?: boolean
    activityLevel?: boolean
    fitnessGoal?: boolean
    heightUnit?: boolean
    weightUnit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type HealthProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "height" | "weight" | "age" | "gender" | "birthday" | "targetWeight" | "targetCalories" | "targetWaterL" | "activityLevel" | "fitnessGoal" | "heightUnit" | "weightUnit" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["healthProfile"]>
  export type HealthProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HealthProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HealthProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HealthProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HealthProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      height: number | null
      weight: number | null
      age: number | null
      gender: string | null
      birthday: Date | null
      targetWeight: number | null
      targetCalories: number | null
      targetWaterL: number | null
      activityLevel: string | null
      fitnessGoal: string | null
      heightUnit: string | null
      weightUnit: string | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["healthProfile"]>
    composites: {}
  }

  type HealthProfileGetPayload<S extends boolean | null | undefined | HealthProfileDefaultArgs> = $Result.GetResult<Prisma.$HealthProfilePayload, S>

  type HealthProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthProfileCountAggregateInputType | true
    }

  export interface HealthProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HealthProfile'], meta: { name: 'HealthProfile' } }
    /**
     * Find zero or one HealthProfile that matches the filter.
     * @param {HealthProfileFindUniqueArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthProfileFindUniqueArgs>(args: SelectSubset<T, HealthProfileFindUniqueArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HealthProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthProfileFindUniqueOrThrowArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileFindFirstArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthProfileFindFirstArgs>(args?: SelectSubset<T, HealthProfileFindFirstArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileFindFirstOrThrowArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HealthProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HealthProfiles
     * const healthProfiles = await prisma.healthProfile.findMany()
     * 
     * // Get first 10 HealthProfiles
     * const healthProfiles = await prisma.healthProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthProfileWithIdOnly = await prisma.healthProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthProfileFindManyArgs>(args?: SelectSubset<T, HealthProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HealthProfile.
     * @param {HealthProfileCreateArgs} args - Arguments to create a HealthProfile.
     * @example
     * // Create one HealthProfile
     * const HealthProfile = await prisma.healthProfile.create({
     *   data: {
     *     // ... data to create a HealthProfile
     *   }
     * })
     * 
     */
    create<T extends HealthProfileCreateArgs>(args: SelectSubset<T, HealthProfileCreateArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HealthProfiles.
     * @param {HealthProfileCreateManyArgs} args - Arguments to create many HealthProfiles.
     * @example
     * // Create many HealthProfiles
     * const healthProfile = await prisma.healthProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthProfileCreateManyArgs>(args?: SelectSubset<T, HealthProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HealthProfiles and returns the data saved in the database.
     * @param {HealthProfileCreateManyAndReturnArgs} args - Arguments to create many HealthProfiles.
     * @example
     * // Create many HealthProfiles
     * const healthProfile = await prisma.healthProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HealthProfiles and only return the `id`
     * const healthProfileWithIdOnly = await prisma.healthProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HealthProfile.
     * @param {HealthProfileDeleteArgs} args - Arguments to delete one HealthProfile.
     * @example
     * // Delete one HealthProfile
     * const HealthProfile = await prisma.healthProfile.delete({
     *   where: {
     *     // ... filter to delete one HealthProfile
     *   }
     * })
     * 
     */
    delete<T extends HealthProfileDeleteArgs>(args: SelectSubset<T, HealthProfileDeleteArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HealthProfile.
     * @param {HealthProfileUpdateArgs} args - Arguments to update one HealthProfile.
     * @example
     * // Update one HealthProfile
     * const healthProfile = await prisma.healthProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthProfileUpdateArgs>(args: SelectSubset<T, HealthProfileUpdateArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HealthProfiles.
     * @param {HealthProfileDeleteManyArgs} args - Arguments to filter HealthProfiles to delete.
     * @example
     * // Delete a few HealthProfiles
     * const { count } = await prisma.healthProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthProfileDeleteManyArgs>(args?: SelectSubset<T, HealthProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HealthProfiles
     * const healthProfile = await prisma.healthProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthProfileUpdateManyArgs>(args: SelectSubset<T, HealthProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthProfiles and returns the data updated in the database.
     * @param {HealthProfileUpdateManyAndReturnArgs} args - Arguments to update many HealthProfiles.
     * @example
     * // Update many HealthProfiles
     * const healthProfile = await prisma.healthProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HealthProfiles and only return the `id`
     * const healthProfileWithIdOnly = await prisma.healthProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HealthProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HealthProfile.
     * @param {HealthProfileUpsertArgs} args - Arguments to update or create a HealthProfile.
     * @example
     * // Update or create a HealthProfile
     * const healthProfile = await prisma.healthProfile.upsert({
     *   create: {
     *     // ... data to create a HealthProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HealthProfile we want to update
     *   }
     * })
     */
    upsert<T extends HealthProfileUpsertArgs>(args: SelectSubset<T, HealthProfileUpsertArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HealthProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileCountArgs} args - Arguments to filter HealthProfiles to count.
     * @example
     * // Count the number of HealthProfiles
     * const count = await prisma.healthProfile.count({
     *   where: {
     *     // ... the filter for the HealthProfiles we want to count
     *   }
     * })
    **/
    count<T extends HealthProfileCountArgs>(
      args?: Subset<T, HealthProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HealthProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HealthProfileAggregateArgs>(args: Subset<T, HealthProfileAggregateArgs>): Prisma.PrismaPromise<GetHealthProfileAggregateType<T>>

    /**
     * Group by HealthProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HealthProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthProfileGroupByArgs['orderBy'] }
        : { orderBy?: HealthProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HealthProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HealthProfile model
   */
  readonly fields: HealthProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HealthProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HealthProfile model
   */
  interface HealthProfileFieldRefs {
    readonly id: FieldRef<"HealthProfile", 'String'>
    readonly userId: FieldRef<"HealthProfile", 'String'>
    readonly height: FieldRef<"HealthProfile", 'Float'>
    readonly weight: FieldRef<"HealthProfile", 'Float'>
    readonly age: FieldRef<"HealthProfile", 'Int'>
    readonly gender: FieldRef<"HealthProfile", 'String'>
    readonly birthday: FieldRef<"HealthProfile", 'DateTime'>
    readonly targetWeight: FieldRef<"HealthProfile", 'Float'>
    readonly targetCalories: FieldRef<"HealthProfile", 'Int'>
    readonly targetWaterL: FieldRef<"HealthProfile", 'Float'>
    readonly activityLevel: FieldRef<"HealthProfile", 'String'>
    readonly fitnessGoal: FieldRef<"HealthProfile", 'String'>
    readonly heightUnit: FieldRef<"HealthProfile", 'String'>
    readonly weightUnit: FieldRef<"HealthProfile", 'String'>
    readonly createdAt: FieldRef<"HealthProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"HealthProfile", 'DateTime'>
    readonly syncedAt: FieldRef<"HealthProfile", 'DateTime'>
    readonly isDeleted: FieldRef<"HealthProfile", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * HealthProfile findUnique
   */
  export type HealthProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile findUniqueOrThrow
   */
  export type HealthProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile findFirst
   */
  export type HealthProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthProfiles.
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthProfiles.
     */
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * HealthProfile findFirstOrThrow
   */
  export type HealthProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthProfiles.
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthProfiles.
     */
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * HealthProfile findMany
   */
  export type HealthProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfiles to fetch.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HealthProfiles.
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * HealthProfile create
   */
  export type HealthProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a HealthProfile.
     */
    data: XOR<HealthProfileCreateInput, HealthProfileUncheckedCreateInput>
  }

  /**
   * HealthProfile createMany
   */
  export type HealthProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HealthProfiles.
     */
    data: HealthProfileCreateManyInput | HealthProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HealthProfile createManyAndReturn
   */
  export type HealthProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * The data used to create many HealthProfiles.
     */
    data: HealthProfileCreateManyInput | HealthProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthProfile update
   */
  export type HealthProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a HealthProfile.
     */
    data: XOR<HealthProfileUpdateInput, HealthProfileUncheckedUpdateInput>
    /**
     * Choose, which HealthProfile to update.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile updateMany
   */
  export type HealthProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HealthProfiles.
     */
    data: XOR<HealthProfileUpdateManyMutationInput, HealthProfileUncheckedUpdateManyInput>
    /**
     * Filter which HealthProfiles to update
     */
    where?: HealthProfileWhereInput
    /**
     * Limit how many HealthProfiles to update.
     */
    limit?: number
  }

  /**
   * HealthProfile updateManyAndReturn
   */
  export type HealthProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * The data used to update HealthProfiles.
     */
    data: XOR<HealthProfileUpdateManyMutationInput, HealthProfileUncheckedUpdateManyInput>
    /**
     * Filter which HealthProfiles to update
     */
    where?: HealthProfileWhereInput
    /**
     * Limit how many HealthProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthProfile upsert
   */
  export type HealthProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the HealthProfile to update in case it exists.
     */
    where: HealthProfileWhereUniqueInput
    /**
     * In case the HealthProfile found by the `where` argument doesn't exist, create a new HealthProfile with this data.
     */
    create: XOR<HealthProfileCreateInput, HealthProfileUncheckedCreateInput>
    /**
     * In case the HealthProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthProfileUpdateInput, HealthProfileUncheckedUpdateInput>
  }

  /**
   * HealthProfile delete
   */
  export type HealthProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter which HealthProfile to delete.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile deleteMany
   */
  export type HealthProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthProfiles to delete
     */
    where?: HealthProfileWhereInput
    /**
     * Limit how many HealthProfiles to delete.
     */
    limit?: number
  }

  /**
   * HealthProfile without action
   */
  export type HealthProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
  }


  /**
   * Model Workout
   */

  export type AggregateWorkout = {
    _count: WorkoutCountAggregateOutputType | null
    _avg: WorkoutAvgAggregateOutputType | null
    _sum: WorkoutSumAggregateOutputType | null
    _min: WorkoutMinAggregateOutputType | null
    _max: WorkoutMaxAggregateOutputType | null
  }

  export type WorkoutAvgAggregateOutputType = {
    durationMin: number | null
    calories: number | null
    totalTime: number | null
    restTime: number | null
  }

  export type WorkoutSumAggregateOutputType = {
    durationMin: number | null
    calories: number | null
    totalTime: number | null
    restTime: number | null
  }

  export type WorkoutMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    category: string | null
    durationMin: number | null
    calories: number | null
    date: Date | null
    notes: string | null
    isCompleted: boolean | null
    totalTime: number | null
    restTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type WorkoutMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    category: string | null
    durationMin: number | null
    calories: number | null
    date: Date | null
    notes: string | null
    isCompleted: boolean | null
    totalTime: number | null
    restTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type WorkoutCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    category: number
    durationMin: number
    calories: number
    date: number
    notes: number
    isCompleted: number
    totalTime: number
    restTime: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type WorkoutAvgAggregateInputType = {
    durationMin?: true
    calories?: true
    totalTime?: true
    restTime?: true
  }

  export type WorkoutSumAggregateInputType = {
    durationMin?: true
    calories?: true
    totalTime?: true
    restTime?: true
  }

  export type WorkoutMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    category?: true
    durationMin?: true
    calories?: true
    date?: true
    notes?: true
    isCompleted?: true
    totalTime?: true
    restTime?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type WorkoutMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    category?: true
    durationMin?: true
    calories?: true
    date?: true
    notes?: true
    isCompleted?: true
    totalTime?: true
    restTime?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type WorkoutCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    category?: true
    durationMin?: true
    calories?: true
    date?: true
    notes?: true
    isCompleted?: true
    totalTime?: true
    restTime?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type WorkoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workout to aggregate.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workouts
    **/
    _count?: true | WorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutMaxAggregateInputType
  }

  export type GetWorkoutAggregateType<T extends WorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkout[P]>
      : GetScalarType<T[P], AggregateWorkout[P]>
  }




  export type WorkoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutWhereInput
    orderBy?: WorkoutOrderByWithAggregationInput | WorkoutOrderByWithAggregationInput[]
    by: WorkoutScalarFieldEnum[] | WorkoutScalarFieldEnum
    having?: WorkoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutCountAggregateInputType | true
    _avg?: WorkoutAvgAggregateInputType
    _sum?: WorkoutSumAggregateInputType
    _min?: WorkoutMinAggregateInputType
    _max?: WorkoutMaxAggregateInputType
  }

  export type WorkoutGroupByOutputType = {
    id: string
    userId: string
    title: string
    category: string
    durationMin: number | null
    calories: number | null
    date: Date
    notes: string | null
    isCompleted: boolean
    totalTime: number | null
    restTime: number | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: WorkoutCountAggregateOutputType | null
    _avg: WorkoutAvgAggregateOutputType | null
    _sum: WorkoutSumAggregateOutputType | null
    _min: WorkoutMinAggregateOutputType | null
    _max: WorkoutMaxAggregateOutputType | null
  }

  type GetWorkoutGroupByPayload<T extends WorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    durationMin?: boolean
    calories?: boolean
    date?: boolean
    notes?: boolean
    isCompleted?: boolean
    totalTime?: boolean
    restTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    exercises?: boolean | Workout$exercisesArgs<ExtArgs>
    _count?: boolean | WorkoutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workout"]>

  export type WorkoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    durationMin?: boolean
    calories?: boolean
    date?: boolean
    notes?: boolean
    isCompleted?: boolean
    totalTime?: boolean
    restTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workout"]>

  export type WorkoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    durationMin?: boolean
    calories?: boolean
    date?: boolean
    notes?: boolean
    isCompleted?: boolean
    totalTime?: boolean
    restTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workout"]>

  export type WorkoutSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    durationMin?: boolean
    calories?: boolean
    date?: boolean
    notes?: boolean
    isCompleted?: boolean
    totalTime?: boolean
    restTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type WorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "category" | "durationMin" | "calories" | "date" | "notes" | "isCompleted" | "totalTime" | "restTime" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["workout"]>
  export type WorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    exercises?: boolean | Workout$exercisesArgs<ExtArgs>
    _count?: boolean | WorkoutCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workout"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      exercises: Prisma.$ExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      category: string
      durationMin: number | null
      calories: number | null
      date: Date
      notes: string | null
      isCompleted: boolean
      totalTime: number | null
      restTime: number | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["workout"]>
    composites: {}
  }

  type WorkoutGetPayload<S extends boolean | null | undefined | WorkoutDefaultArgs> = $Result.GetResult<Prisma.$WorkoutPayload, S>

  type WorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutCountAggregateInputType | true
    }

  export interface WorkoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workout'], meta: { name: 'Workout' } }
    /**
     * Find zero or one Workout that matches the filter.
     * @param {WorkoutFindUniqueArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutFindUniqueArgs>(args: SelectSubset<T, WorkoutFindUniqueArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutFindUniqueOrThrowArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindFirstArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutFindFirstArgs>(args?: SelectSubset<T, WorkoutFindFirstArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindFirstOrThrowArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workouts
     * const workouts = await prisma.workout.findMany()
     * 
     * // Get first 10 Workouts
     * const workouts = await prisma.workout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutWithIdOnly = await prisma.workout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutFindManyArgs>(args?: SelectSubset<T, WorkoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workout.
     * @param {WorkoutCreateArgs} args - Arguments to create a Workout.
     * @example
     * // Create one Workout
     * const Workout = await prisma.workout.create({
     *   data: {
     *     // ... data to create a Workout
     *   }
     * })
     * 
     */
    create<T extends WorkoutCreateArgs>(args: SelectSubset<T, WorkoutCreateArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workouts.
     * @param {WorkoutCreateManyArgs} args - Arguments to create many Workouts.
     * @example
     * // Create many Workouts
     * const workout = await prisma.workout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutCreateManyArgs>(args?: SelectSubset<T, WorkoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workouts and returns the data saved in the database.
     * @param {WorkoutCreateManyAndReturnArgs} args - Arguments to create many Workouts.
     * @example
     * // Create many Workouts
     * const workout = await prisma.workout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workouts and only return the `id`
     * const workoutWithIdOnly = await prisma.workout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workout.
     * @param {WorkoutDeleteArgs} args - Arguments to delete one Workout.
     * @example
     * // Delete one Workout
     * const Workout = await prisma.workout.delete({
     *   where: {
     *     // ... filter to delete one Workout
     *   }
     * })
     * 
     */
    delete<T extends WorkoutDeleteArgs>(args: SelectSubset<T, WorkoutDeleteArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workout.
     * @param {WorkoutUpdateArgs} args - Arguments to update one Workout.
     * @example
     * // Update one Workout
     * const workout = await prisma.workout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutUpdateArgs>(args: SelectSubset<T, WorkoutUpdateArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workouts.
     * @param {WorkoutDeleteManyArgs} args - Arguments to filter Workouts to delete.
     * @example
     * // Delete a few Workouts
     * const { count } = await prisma.workout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutDeleteManyArgs>(args?: SelectSubset<T, WorkoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutUpdateManyArgs>(args: SelectSubset<T, WorkoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workouts and returns the data updated in the database.
     * @param {WorkoutUpdateManyAndReturnArgs} args - Arguments to update many Workouts.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workouts and only return the `id`
     * const workoutWithIdOnly = await prisma.workout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkoutUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workout.
     * @param {WorkoutUpsertArgs} args - Arguments to update or create a Workout.
     * @example
     * // Update or create a Workout
     * const workout = await prisma.workout.upsert({
     *   create: {
     *     // ... data to create a Workout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workout we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutUpsertArgs>(args: SelectSubset<T, WorkoutUpsertArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCountArgs} args - Arguments to filter Workouts to count.
     * @example
     * // Count the number of Workouts
     * const count = await prisma.workout.count({
     *   where: {
     *     // ... the filter for the Workouts we want to count
     *   }
     * })
    **/
    count<T extends WorkoutCountArgs>(
      args?: Subset<T, WorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkoutAggregateArgs>(args: Subset<T, WorkoutAggregateArgs>): Prisma.PrismaPromise<GetWorkoutAggregateType<T>>

    /**
     * Group by Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workout model
   */
  readonly fields: WorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    exercises<T extends Workout$exercisesArgs<ExtArgs> = {}>(args?: Subset<T, Workout$exercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workout model
   */
  interface WorkoutFieldRefs {
    readonly id: FieldRef<"Workout", 'String'>
    readonly userId: FieldRef<"Workout", 'String'>
    readonly title: FieldRef<"Workout", 'String'>
    readonly category: FieldRef<"Workout", 'String'>
    readonly durationMin: FieldRef<"Workout", 'Int'>
    readonly calories: FieldRef<"Workout", 'Int'>
    readonly date: FieldRef<"Workout", 'DateTime'>
    readonly notes: FieldRef<"Workout", 'String'>
    readonly isCompleted: FieldRef<"Workout", 'Boolean'>
    readonly totalTime: FieldRef<"Workout", 'Int'>
    readonly restTime: FieldRef<"Workout", 'Int'>
    readonly createdAt: FieldRef<"Workout", 'DateTime'>
    readonly updatedAt: FieldRef<"Workout", 'DateTime'>
    readonly syncedAt: FieldRef<"Workout", 'DateTime'>
    readonly isDeleted: FieldRef<"Workout", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Workout findUnique
   */
  export type WorkoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout findUniqueOrThrow
   */
  export type WorkoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout findFirst
   */
  export type WorkoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workouts.
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workouts.
     */
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * Workout findFirstOrThrow
   */
  export type WorkoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workouts.
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workouts.
     */
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * Workout findMany
   */
  export type WorkoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workouts to fetch.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workouts.
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * Workout create
   */
  export type WorkoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Workout.
     */
    data: XOR<WorkoutCreateInput, WorkoutUncheckedCreateInput>
  }

  /**
   * Workout createMany
   */
  export type WorkoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workouts.
     */
    data: WorkoutCreateManyInput | WorkoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workout createManyAndReturn
   */
  export type WorkoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * The data used to create many Workouts.
     */
    data: WorkoutCreateManyInput | WorkoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workout update
   */
  export type WorkoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Workout.
     */
    data: XOR<WorkoutUpdateInput, WorkoutUncheckedUpdateInput>
    /**
     * Choose, which Workout to update.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout updateMany
   */
  export type WorkoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workouts.
     */
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyInput>
    /**
     * Filter which Workouts to update
     */
    where?: WorkoutWhereInput
    /**
     * Limit how many Workouts to update.
     */
    limit?: number
  }

  /**
   * Workout updateManyAndReturn
   */
  export type WorkoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * The data used to update Workouts.
     */
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyInput>
    /**
     * Filter which Workouts to update
     */
    where?: WorkoutWhereInput
    /**
     * Limit how many Workouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workout upsert
   */
  export type WorkoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Workout to update in case it exists.
     */
    where: WorkoutWhereUniqueInput
    /**
     * In case the Workout found by the `where` argument doesn't exist, create a new Workout with this data.
     */
    create: XOR<WorkoutCreateInput, WorkoutUncheckedCreateInput>
    /**
     * In case the Workout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutUpdateInput, WorkoutUncheckedUpdateInput>
  }

  /**
   * Workout delete
   */
  export type WorkoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter which Workout to delete.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout deleteMany
   */
  export type WorkoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workouts to delete
     */
    where?: WorkoutWhereInput
    /**
     * Limit how many Workouts to delete.
     */
    limit?: number
  }

  /**
   * Workout.exercises
   */
  export type Workout$exercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Workout without action
   */
  export type WorkoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseAvgAggregateOutputType = {
    sets: number | null
    reps: number | null
    weightKg: number | null
    duration: number | null
    distance: number | null
    restTime: number | null
    order: number | null
  }

  export type ExerciseSumAggregateOutputType = {
    sets: number | null
    reps: number | null
    weightKg: number | null
    duration: number | null
    distance: number | null
    restTime: number | null
    order: number | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: string | null
    workoutId: string | null
    name: string | null
    sets: number | null
    reps: number | null
    weightKg: number | null
    duration: number | null
    distance: number | null
    restTime: number | null
    order: number | null
    isCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: string | null
    workoutId: string | null
    name: string | null
    sets: number | null
    reps: number | null
    weightKg: number | null
    duration: number | null
    distance: number | null
    restTime: number | null
    order: number | null
    isCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    workoutId: number
    name: number
    sets: number
    reps: number
    weightKg: number
    duration: number
    distance: number
    restTime: number
    order: number
    isCompleted: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type ExerciseAvgAggregateInputType = {
    sets?: true
    reps?: true
    weightKg?: true
    duration?: true
    distance?: true
    restTime?: true
    order?: true
  }

  export type ExerciseSumAggregateInputType = {
    sets?: true
    reps?: true
    weightKg?: true
    duration?: true
    distance?: true
    restTime?: true
    order?: true
  }

  export type ExerciseMinAggregateInputType = {
    id?: true
    workoutId?: true
    name?: true
    sets?: true
    reps?: true
    weightKg?: true
    duration?: true
    distance?: true
    restTime?: true
    order?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    workoutId?: true
    name?: true
    sets?: true
    reps?: true
    weightKg?: true
    duration?: true
    distance?: true
    restTime?: true
    order?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    workoutId?: true
    name?: true
    sets?: true
    reps?: true
    weightKg?: true
    duration?: true
    distance?: true
    restTime?: true
    order?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _avg?: ExerciseAvgAggregateInputType
    _sum?: ExerciseSumAggregateInputType
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: string
    workoutId: string
    name: string
    sets: number | null
    reps: number | null
    weightKg: number | null
    duration: number | null
    distance: number | null
    restTime: number | null
    order: number
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutId?: boolean
    name?: boolean
    sets?: boolean
    reps?: boolean
    weightKg?: boolean
    duration?: boolean
    distance?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutId?: boolean
    name?: boolean
    sets?: boolean
    reps?: boolean
    weightKg?: boolean
    duration?: boolean
    distance?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutId?: boolean
    name?: boolean
    sets?: boolean
    reps?: boolean
    weightKg?: boolean
    duration?: boolean
    distance?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectScalar = {
    id?: boolean
    workoutId?: boolean
    name?: boolean
    sets?: boolean
    reps?: boolean
    weightKg?: boolean
    duration?: boolean
    distance?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workoutId" | "name" | "sets" | "reps" | "weightKg" | "duration" | "distance" | "restTime" | "order" | "isCompleted" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      workout: Prisma.$WorkoutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workoutId: string
      name: string
      sets: number | null
      reps: number | null
      weightKg: number | null
      duration: number | null
      distance: number | null
      restTime: number | null
      order: number
      isCompleted: boolean
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workout<T extends WorkoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutDefaultArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'String'>
    readonly workoutId: FieldRef<"Exercise", 'String'>
    readonly name: FieldRef<"Exercise", 'String'>
    readonly sets: FieldRef<"Exercise", 'Int'>
    readonly reps: FieldRef<"Exercise", 'Int'>
    readonly weightKg: FieldRef<"Exercise", 'Float'>
    readonly duration: FieldRef<"Exercise", 'Int'>
    readonly distance: FieldRef<"Exercise", 'Float'>
    readonly restTime: FieldRef<"Exercise", 'Int'>
    readonly order: FieldRef<"Exercise", 'Int'>
    readonly isCompleted: FieldRef<"Exercise", 'Boolean'>
    readonly createdAt: FieldRef<"Exercise", 'DateTime'>
    readonly updatedAt: FieldRef<"Exercise", 'DateTime'>
    readonly syncedAt: FieldRef<"Exercise", 'DateTime'>
    readonly isDeleted: FieldRef<"Exercise", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Model Meal
   */

  export type AggregateMeal = {
    _count: MealCountAggregateOutputType | null
    _avg: MealAvgAggregateOutputType | null
    _sum: MealSumAggregateOutputType | null
    _min: MealMinAggregateOutputType | null
    _max: MealMaxAggregateOutputType | null
  }

  export type MealAvgAggregateOutputType = {
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
  }

  export type MealSumAggregateOutputType = {
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
  }

  export type MealMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    mealType: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    date: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type MealMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    mealType: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    date: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type MealCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    mealType: number
    calories: number
    protein: number
    carbs: number
    fat: number
    date: number
    notes: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type MealAvgAggregateInputType = {
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
  }

  export type MealSumAggregateInputType = {
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
  }

  export type MealMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    mealType?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    date?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type MealMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    mealType?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    date?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type MealCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    mealType?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    date?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type MealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meal to aggregate.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meals
    **/
    _count?: true | MealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealMaxAggregateInputType
  }

  export type GetMealAggregateType<T extends MealAggregateArgs> = {
        [P in keyof T & keyof AggregateMeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeal[P]>
      : GetScalarType<T[P], AggregateMeal[P]>
  }




  export type MealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealWhereInput
    orderBy?: MealOrderByWithAggregationInput | MealOrderByWithAggregationInput[]
    by: MealScalarFieldEnum[] | MealScalarFieldEnum
    having?: MealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealCountAggregateInputType | true
    _avg?: MealAvgAggregateInputType
    _sum?: MealSumAggregateInputType
    _min?: MealMinAggregateInputType
    _max?: MealMaxAggregateInputType
  }

  export type MealGroupByOutputType = {
    id: string
    userId: string
    name: string
    mealType: string
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    date: Date
    notes: string | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: MealCountAggregateOutputType | null
    _avg: MealAvgAggregateOutputType | null
    _sum: MealSumAggregateOutputType | null
    _min: MealMinAggregateOutputType | null
    _max: MealMaxAggregateOutputType | null
  }

  type GetMealGroupByPayload<T extends MealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealGroupByOutputType[P]>
            : GetScalarType<T[P], MealGroupByOutputType[P]>
        }
      >
    >


  export type MealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    mealType?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mealItems?: boolean | Meal$mealItemsArgs<ExtArgs>
    _count?: boolean | MealCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meal"]>

  export type MealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    mealType?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meal"]>

  export type MealSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    mealType?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meal"]>

  export type MealSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    mealType?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type MealOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "mealType" | "calories" | "protein" | "carbs" | "fat" | "date" | "notes" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["meal"]>
  export type MealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mealItems?: boolean | Meal$mealItemsArgs<ExtArgs>
    _count?: boolean | MealCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MealIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mealItems: Prisma.$MealItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      mealType: string
      calories: number | null
      protein: number | null
      carbs: number | null
      fat: number | null
      date: Date
      notes: string | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["meal"]>
    composites: {}
  }

  type MealGetPayload<S extends boolean | null | undefined | MealDefaultArgs> = $Result.GetResult<Prisma.$MealPayload, S>

  type MealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealCountAggregateInputType | true
    }

  export interface MealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meal'], meta: { name: 'Meal' } }
    /**
     * Find zero or one Meal that matches the filter.
     * @param {MealFindUniqueArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealFindUniqueArgs>(args: SelectSubset<T, MealFindUniqueArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealFindUniqueOrThrowArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealFindUniqueOrThrowArgs>(args: SelectSubset<T, MealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealFindFirstArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealFindFirstArgs>(args?: SelectSubset<T, MealFindFirstArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealFindFirstOrThrowArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealFindFirstOrThrowArgs>(args?: SelectSubset<T, MealFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meals
     * const meals = await prisma.meal.findMany()
     * 
     * // Get first 10 Meals
     * const meals = await prisma.meal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealWithIdOnly = await prisma.meal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealFindManyArgs>(args?: SelectSubset<T, MealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meal.
     * @param {MealCreateArgs} args - Arguments to create a Meal.
     * @example
     * // Create one Meal
     * const Meal = await prisma.meal.create({
     *   data: {
     *     // ... data to create a Meal
     *   }
     * })
     * 
     */
    create<T extends MealCreateArgs>(args: SelectSubset<T, MealCreateArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meals.
     * @param {MealCreateManyArgs} args - Arguments to create many Meals.
     * @example
     * // Create many Meals
     * const meal = await prisma.meal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealCreateManyArgs>(args?: SelectSubset<T, MealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meals and returns the data saved in the database.
     * @param {MealCreateManyAndReturnArgs} args - Arguments to create many Meals.
     * @example
     * // Create many Meals
     * const meal = await prisma.meal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meals and only return the `id`
     * const mealWithIdOnly = await prisma.meal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealCreateManyAndReturnArgs>(args?: SelectSubset<T, MealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meal.
     * @param {MealDeleteArgs} args - Arguments to delete one Meal.
     * @example
     * // Delete one Meal
     * const Meal = await prisma.meal.delete({
     *   where: {
     *     // ... filter to delete one Meal
     *   }
     * })
     * 
     */
    delete<T extends MealDeleteArgs>(args: SelectSubset<T, MealDeleteArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meal.
     * @param {MealUpdateArgs} args - Arguments to update one Meal.
     * @example
     * // Update one Meal
     * const meal = await prisma.meal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealUpdateArgs>(args: SelectSubset<T, MealUpdateArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meals.
     * @param {MealDeleteManyArgs} args - Arguments to filter Meals to delete.
     * @example
     * // Delete a few Meals
     * const { count } = await prisma.meal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealDeleteManyArgs>(args?: SelectSubset<T, MealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meals
     * const meal = await prisma.meal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealUpdateManyArgs>(args: SelectSubset<T, MealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meals and returns the data updated in the database.
     * @param {MealUpdateManyAndReturnArgs} args - Arguments to update many Meals.
     * @example
     * // Update many Meals
     * const meal = await prisma.meal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meals and only return the `id`
     * const mealWithIdOnly = await prisma.meal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MealUpdateManyAndReturnArgs>(args: SelectSubset<T, MealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meal.
     * @param {MealUpsertArgs} args - Arguments to update or create a Meal.
     * @example
     * // Update or create a Meal
     * const meal = await prisma.meal.upsert({
     *   create: {
     *     // ... data to create a Meal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meal we want to update
     *   }
     * })
     */
    upsert<T extends MealUpsertArgs>(args: SelectSubset<T, MealUpsertArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCountArgs} args - Arguments to filter Meals to count.
     * @example
     * // Count the number of Meals
     * const count = await prisma.meal.count({
     *   where: {
     *     // ... the filter for the Meals we want to count
     *   }
     * })
    **/
    count<T extends MealCountArgs>(
      args?: Subset<T, MealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealAggregateArgs>(args: Subset<T, MealAggregateArgs>): Prisma.PrismaPromise<GetMealAggregateType<T>>

    /**
     * Group by Meal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealGroupByArgs['orderBy'] }
        : { orderBy?: MealGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meal model
   */
  readonly fields: MealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mealItems<T extends Meal$mealItemsArgs<ExtArgs> = {}>(args?: Subset<T, Meal$mealItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Meal model
   */
  interface MealFieldRefs {
    readonly id: FieldRef<"Meal", 'String'>
    readonly userId: FieldRef<"Meal", 'String'>
    readonly name: FieldRef<"Meal", 'String'>
    readonly mealType: FieldRef<"Meal", 'String'>
    readonly calories: FieldRef<"Meal", 'Int'>
    readonly protein: FieldRef<"Meal", 'Float'>
    readonly carbs: FieldRef<"Meal", 'Float'>
    readonly fat: FieldRef<"Meal", 'Float'>
    readonly date: FieldRef<"Meal", 'DateTime'>
    readonly notes: FieldRef<"Meal", 'String'>
    readonly createdAt: FieldRef<"Meal", 'DateTime'>
    readonly updatedAt: FieldRef<"Meal", 'DateTime'>
    readonly syncedAt: FieldRef<"Meal", 'DateTime'>
    readonly isDeleted: FieldRef<"Meal", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Meal findUnique
   */
  export type MealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal findUniqueOrThrow
   */
  export type MealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal findFirst
   */
  export type MealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meals.
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meals.
     */
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Meal findFirstOrThrow
   */
  export type MealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meals.
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meals.
     */
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Meal findMany
   */
  export type MealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meals to fetch.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meals.
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Meal create
   */
  export type MealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * The data needed to create a Meal.
     */
    data: XOR<MealCreateInput, MealUncheckedCreateInput>
  }

  /**
   * Meal createMany
   */
  export type MealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meals.
     */
    data: MealCreateManyInput | MealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meal createManyAndReturn
   */
  export type MealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * The data used to create many Meals.
     */
    data: MealCreateManyInput | MealCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Meal update
   */
  export type MealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * The data needed to update a Meal.
     */
    data: XOR<MealUpdateInput, MealUncheckedUpdateInput>
    /**
     * Choose, which Meal to update.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal updateMany
   */
  export type MealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meals.
     */
    data: XOR<MealUpdateManyMutationInput, MealUncheckedUpdateManyInput>
    /**
     * Filter which Meals to update
     */
    where?: MealWhereInput
    /**
     * Limit how many Meals to update.
     */
    limit?: number
  }

  /**
   * Meal updateManyAndReturn
   */
  export type MealUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * The data used to update Meals.
     */
    data: XOR<MealUpdateManyMutationInput, MealUncheckedUpdateManyInput>
    /**
     * Filter which Meals to update
     */
    where?: MealWhereInput
    /**
     * Limit how many Meals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Meal upsert
   */
  export type MealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * The filter to search for the Meal to update in case it exists.
     */
    where: MealWhereUniqueInput
    /**
     * In case the Meal found by the `where` argument doesn't exist, create a new Meal with this data.
     */
    create: XOR<MealCreateInput, MealUncheckedCreateInput>
    /**
     * In case the Meal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealUpdateInput, MealUncheckedUpdateInput>
  }

  /**
   * Meal delete
   */
  export type MealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter which Meal to delete.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal deleteMany
   */
  export type MealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meals to delete
     */
    where?: MealWhereInput
    /**
     * Limit how many Meals to delete.
     */
    limit?: number
  }

  /**
   * Meal.mealItems
   */
  export type Meal$mealItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    where?: MealItemWhereInput
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    cursor?: MealItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * Meal without action
   */
  export type MealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meal
     */
    omit?: MealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
  }


  /**
   * Model MealItem
   */

  export type AggregateMealItem = {
    _count: MealItemCountAggregateOutputType | null
    _avg: MealItemAvgAggregateOutputType | null
    _sum: MealItemSumAggregateOutputType | null
    _min: MealItemMinAggregateOutputType | null
    _max: MealItemMaxAggregateOutputType | null
  }

  export type MealItemAvgAggregateOutputType = {
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    quantity: number | null
  }

  export type MealItemSumAggregateOutputType = {
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    quantity: number | null
  }

  export type MealItemMinAggregateOutputType = {
    id: string | null
    mealId: string | null
    userId: string | null
    name: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    quantity: number | null
    unit: string | null
    isHighInProtein: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type MealItemMaxAggregateOutputType = {
    id: string | null
    mealId: string | null
    userId: string | null
    name: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    quantity: number | null
    unit: string | null
    isHighInProtein: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type MealItemCountAggregateOutputType = {
    id: number
    mealId: number
    userId: number
    name: number
    calories: number
    protein: number
    carbs: number
    fat: number
    quantity: number
    unit: number
    isHighInProtein: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type MealItemAvgAggregateInputType = {
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    quantity?: true
  }

  export type MealItemSumAggregateInputType = {
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    quantity?: true
  }

  export type MealItemMinAggregateInputType = {
    id?: true
    mealId?: true
    userId?: true
    name?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    quantity?: true
    unit?: true
    isHighInProtein?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type MealItemMaxAggregateInputType = {
    id?: true
    mealId?: true
    userId?: true
    name?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    quantity?: true
    unit?: true
    isHighInProtein?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type MealItemCountAggregateInputType = {
    id?: true
    mealId?: true
    userId?: true
    name?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    quantity?: true
    unit?: true
    isHighInProtein?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type MealItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealItem to aggregate.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealItems
    **/
    _count?: true | MealItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealItemMaxAggregateInputType
  }

  export type GetMealItemAggregateType<T extends MealItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMealItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealItem[P]>
      : GetScalarType<T[P], AggregateMealItem[P]>
  }




  export type MealItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealItemWhereInput
    orderBy?: MealItemOrderByWithAggregationInput | MealItemOrderByWithAggregationInput[]
    by: MealItemScalarFieldEnum[] | MealItemScalarFieldEnum
    having?: MealItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealItemCountAggregateInputType | true
    _avg?: MealItemAvgAggregateInputType
    _sum?: MealItemSumAggregateInputType
    _min?: MealItemMinAggregateInputType
    _max?: MealItemMaxAggregateInputType
  }

  export type MealItemGroupByOutputType = {
    id: string
    mealId: string
    userId: string
    name: string
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    quantity: number | null
    unit: string | null
    isHighInProtein: boolean
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: MealItemCountAggregateOutputType | null
    _avg: MealItemAvgAggregateOutputType | null
    _sum: MealItemSumAggregateOutputType | null
    _min: MealItemMinAggregateOutputType | null
    _max: MealItemMaxAggregateOutputType | null
  }

  type GetMealItemGroupByPayload<T extends MealItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealItemGroupByOutputType[P]>
            : GetScalarType<T[P], MealItemGroupByOutputType[P]>
        }
      >
    >


  export type MealItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealId?: boolean
    userId?: boolean
    name?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    quantity?: boolean
    unit?: boolean
    isHighInProtein?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    meal?: boolean | MealDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealItem"]>

  export type MealItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealId?: boolean
    userId?: boolean
    name?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    quantity?: boolean
    unit?: boolean
    isHighInProtein?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    meal?: boolean | MealDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealItem"]>

  export type MealItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealId?: boolean
    userId?: boolean
    name?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    quantity?: boolean
    unit?: boolean
    isHighInProtein?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    meal?: boolean | MealDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealItem"]>

  export type MealItemSelectScalar = {
    id?: boolean
    mealId?: boolean
    userId?: boolean
    name?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    quantity?: boolean
    unit?: boolean
    isHighInProtein?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type MealItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mealId" | "userId" | "name" | "calories" | "protein" | "carbs" | "fat" | "quantity" | "unit" | "isHighInProtein" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["mealItem"]>
  export type MealItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meal?: boolean | MealDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MealItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meal?: boolean | MealDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MealItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meal?: boolean | MealDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MealItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealItem"
    objects: {
      meal: Prisma.$MealPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mealId: string
      userId: string
      name: string
      calories: number | null
      protein: number | null
      carbs: number | null
      fat: number | null
      quantity: number | null
      unit: string | null
      isHighInProtein: boolean
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["mealItem"]>
    composites: {}
  }

  type MealItemGetPayload<S extends boolean | null | undefined | MealItemDefaultArgs> = $Result.GetResult<Prisma.$MealItemPayload, S>

  type MealItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealItemCountAggregateInputType | true
    }

  export interface MealItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealItem'], meta: { name: 'MealItem' } }
    /**
     * Find zero or one MealItem that matches the filter.
     * @param {MealItemFindUniqueArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealItemFindUniqueArgs>(args: SelectSubset<T, MealItemFindUniqueArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MealItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealItemFindUniqueOrThrowArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MealItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemFindFirstArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealItemFindFirstArgs>(args?: SelectSubset<T, MealItemFindFirstArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemFindFirstOrThrowArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MealItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MealItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealItems
     * const mealItems = await prisma.mealItem.findMany()
     * 
     * // Get first 10 MealItems
     * const mealItems = await prisma.mealItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealItemWithIdOnly = await prisma.mealItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealItemFindManyArgs>(args?: SelectSubset<T, MealItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MealItem.
     * @param {MealItemCreateArgs} args - Arguments to create a MealItem.
     * @example
     * // Create one MealItem
     * const MealItem = await prisma.mealItem.create({
     *   data: {
     *     // ... data to create a MealItem
     *   }
     * })
     * 
     */
    create<T extends MealItemCreateArgs>(args: SelectSubset<T, MealItemCreateArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MealItems.
     * @param {MealItemCreateManyArgs} args - Arguments to create many MealItems.
     * @example
     * // Create many MealItems
     * const mealItem = await prisma.mealItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealItemCreateManyArgs>(args?: SelectSubset<T, MealItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealItems and returns the data saved in the database.
     * @param {MealItemCreateManyAndReturnArgs} args - Arguments to create many MealItems.
     * @example
     * // Create many MealItems
     * const mealItem = await prisma.mealItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealItems and only return the `id`
     * const mealItemWithIdOnly = await prisma.mealItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MealItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MealItem.
     * @param {MealItemDeleteArgs} args - Arguments to delete one MealItem.
     * @example
     * // Delete one MealItem
     * const MealItem = await prisma.mealItem.delete({
     *   where: {
     *     // ... filter to delete one MealItem
     *   }
     * })
     * 
     */
    delete<T extends MealItemDeleteArgs>(args: SelectSubset<T, MealItemDeleteArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MealItem.
     * @param {MealItemUpdateArgs} args - Arguments to update one MealItem.
     * @example
     * // Update one MealItem
     * const mealItem = await prisma.mealItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealItemUpdateArgs>(args: SelectSubset<T, MealItemUpdateArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MealItems.
     * @param {MealItemDeleteManyArgs} args - Arguments to filter MealItems to delete.
     * @example
     * // Delete a few MealItems
     * const { count } = await prisma.mealItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealItemDeleteManyArgs>(args?: SelectSubset<T, MealItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealItems
     * const mealItem = await prisma.mealItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealItemUpdateManyArgs>(args: SelectSubset<T, MealItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealItems and returns the data updated in the database.
     * @param {MealItemUpdateManyAndReturnArgs} args - Arguments to update many MealItems.
     * @example
     * // Update many MealItems
     * const mealItem = await prisma.mealItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MealItems and only return the `id`
     * const mealItemWithIdOnly = await prisma.mealItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MealItemUpdateManyAndReturnArgs>(args: SelectSubset<T, MealItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MealItem.
     * @param {MealItemUpsertArgs} args - Arguments to update or create a MealItem.
     * @example
     * // Update or create a MealItem
     * const mealItem = await prisma.mealItem.upsert({
     *   create: {
     *     // ... data to create a MealItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealItem we want to update
     *   }
     * })
     */
    upsert<T extends MealItemUpsertArgs>(args: SelectSubset<T, MealItemUpsertArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MealItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemCountArgs} args - Arguments to filter MealItems to count.
     * @example
     * // Count the number of MealItems
     * const count = await prisma.mealItem.count({
     *   where: {
     *     // ... the filter for the MealItems we want to count
     *   }
     * })
    **/
    count<T extends MealItemCountArgs>(
      args?: Subset<T, MealItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealItemAggregateArgs>(args: Subset<T, MealItemAggregateArgs>): Prisma.PrismaPromise<GetMealItemAggregateType<T>>

    /**
     * Group by MealItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MealItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealItemGroupByArgs['orderBy'] }
        : { orderBy?: MealItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MealItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealItem model
   */
  readonly fields: MealItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meal<T extends MealDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MealDefaultArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MealItem model
   */
  interface MealItemFieldRefs {
    readonly id: FieldRef<"MealItem", 'String'>
    readonly mealId: FieldRef<"MealItem", 'String'>
    readonly userId: FieldRef<"MealItem", 'String'>
    readonly name: FieldRef<"MealItem", 'String'>
    readonly calories: FieldRef<"MealItem", 'Int'>
    readonly protein: FieldRef<"MealItem", 'Float'>
    readonly carbs: FieldRef<"MealItem", 'Float'>
    readonly fat: FieldRef<"MealItem", 'Float'>
    readonly quantity: FieldRef<"MealItem", 'Float'>
    readonly unit: FieldRef<"MealItem", 'String'>
    readonly isHighInProtein: FieldRef<"MealItem", 'Boolean'>
    readonly createdAt: FieldRef<"MealItem", 'DateTime'>
    readonly updatedAt: FieldRef<"MealItem", 'DateTime'>
    readonly syncedAt: FieldRef<"MealItem", 'DateTime'>
    readonly isDeleted: FieldRef<"MealItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * MealItem findUnique
   */
  export type MealItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem findUniqueOrThrow
   */
  export type MealItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem findFirst
   */
  export type MealItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealItems.
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealItems.
     */
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * MealItem findFirstOrThrow
   */
  export type MealItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealItems.
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealItems.
     */
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * MealItem findMany
   */
  export type MealItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItems to fetch.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealItems.
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * MealItem create
   */
  export type MealItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MealItem.
     */
    data: XOR<MealItemCreateInput, MealItemUncheckedCreateInput>
  }

  /**
   * MealItem createMany
   */
  export type MealItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealItems.
     */
    data: MealItemCreateManyInput | MealItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealItem createManyAndReturn
   */
  export type MealItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * The data used to create many MealItems.
     */
    data: MealItemCreateManyInput | MealItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealItem update
   */
  export type MealItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MealItem.
     */
    data: XOR<MealItemUpdateInput, MealItemUncheckedUpdateInput>
    /**
     * Choose, which MealItem to update.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem updateMany
   */
  export type MealItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealItems.
     */
    data: XOR<MealItemUpdateManyMutationInput, MealItemUncheckedUpdateManyInput>
    /**
     * Filter which MealItems to update
     */
    where?: MealItemWhereInput
    /**
     * Limit how many MealItems to update.
     */
    limit?: number
  }

  /**
   * MealItem updateManyAndReturn
   */
  export type MealItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * The data used to update MealItems.
     */
    data: XOR<MealItemUpdateManyMutationInput, MealItemUncheckedUpdateManyInput>
    /**
     * Filter which MealItems to update
     */
    where?: MealItemWhereInput
    /**
     * Limit how many MealItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealItem upsert
   */
  export type MealItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MealItem to update in case it exists.
     */
    where: MealItemWhereUniqueInput
    /**
     * In case the MealItem found by the `where` argument doesn't exist, create a new MealItem with this data.
     */
    create: XOR<MealItemCreateInput, MealItemUncheckedCreateInput>
    /**
     * In case the MealItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealItemUpdateInput, MealItemUncheckedUpdateInput>
  }

  /**
   * MealItem delete
   */
  export type MealItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter which MealItem to delete.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem deleteMany
   */
  export type MealItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealItems to delete
     */
    where?: MealItemWhereInput
    /**
     * Limit how many MealItems to delete.
     */
    limit?: number
  }

  /**
   * MealItem without action
   */
  export type MealItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealItem
     */
    omit?: MealItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
  }


  /**
   * Model ProgressLog
   */

  export type AggregateProgressLog = {
    _count: ProgressLogCountAggregateOutputType | null
    _avg: ProgressLogAvgAggregateOutputType | null
    _sum: ProgressLogSumAggregateOutputType | null
    _min: ProgressLogMinAggregateOutputType | null
    _max: ProgressLogMaxAggregateOutputType | null
  }

  export type ProgressLogAvgAggregateOutputType = {
    waterL: number | null
    sleepHrs: number | null
    weightKg: number | null
    steps: number | null
    activeMinutes: number | null
  }

  export type ProgressLogSumAggregateOutputType = {
    waterL: number | null
    sleepHrs: number | null
    weightKg: number | null
    steps: number | null
    activeMinutes: number | null
  }

  export type ProgressLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    waterL: number | null
    sleepHrs: number | null
    mood: string | null
    weightKg: number | null
    steps: number | null
    activeMinutes: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type ProgressLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    waterL: number | null
    sleepHrs: number | null
    mood: string | null
    weightKg: number | null
    steps: number | null
    activeMinutes: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type ProgressLogCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    waterL: number
    sleepHrs: number
    mood: number
    weightKg: number
    steps: number
    activeMinutes: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type ProgressLogAvgAggregateInputType = {
    waterL?: true
    sleepHrs?: true
    weightKg?: true
    steps?: true
    activeMinutes?: true
  }

  export type ProgressLogSumAggregateInputType = {
    waterL?: true
    sleepHrs?: true
    weightKg?: true
    steps?: true
    activeMinutes?: true
  }

  export type ProgressLogMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    waterL?: true
    sleepHrs?: true
    mood?: true
    weightKg?: true
    steps?: true
    activeMinutes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type ProgressLogMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    waterL?: true
    sleepHrs?: true
    mood?: true
    weightKg?: true
    steps?: true
    activeMinutes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type ProgressLogCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    waterL?: true
    sleepHrs?: true
    mood?: true
    weightKg?: true
    steps?: true
    activeMinutes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type ProgressLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgressLog to aggregate.
     */
    where?: ProgressLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressLogs to fetch.
     */
    orderBy?: ProgressLogOrderByWithRelationInput | ProgressLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgressLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgressLogs
    **/
    _count?: true | ProgressLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgressLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgressLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgressLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgressLogMaxAggregateInputType
  }

  export type GetProgressLogAggregateType<T extends ProgressLogAggregateArgs> = {
        [P in keyof T & keyof AggregateProgressLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgressLog[P]>
      : GetScalarType<T[P], AggregateProgressLog[P]>
  }




  export type ProgressLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressLogWhereInput
    orderBy?: ProgressLogOrderByWithAggregationInput | ProgressLogOrderByWithAggregationInput[]
    by: ProgressLogScalarFieldEnum[] | ProgressLogScalarFieldEnum
    having?: ProgressLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgressLogCountAggregateInputType | true
    _avg?: ProgressLogAvgAggregateInputType
    _sum?: ProgressLogSumAggregateInputType
    _min?: ProgressLogMinAggregateInputType
    _max?: ProgressLogMaxAggregateInputType
  }

  export type ProgressLogGroupByOutputType = {
    id: string
    userId: string
    date: Date
    waterL: number | null
    sleepHrs: number | null
    mood: string | null
    weightKg: number | null
    steps: number | null
    activeMinutes: number | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: ProgressLogCountAggregateOutputType | null
    _avg: ProgressLogAvgAggregateOutputType | null
    _sum: ProgressLogSumAggregateOutputType | null
    _min: ProgressLogMinAggregateOutputType | null
    _max: ProgressLogMaxAggregateOutputType | null
  }

  type GetProgressLogGroupByPayload<T extends ProgressLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgressLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgressLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgressLogGroupByOutputType[P]>
            : GetScalarType<T[P], ProgressLogGroupByOutputType[P]>
        }
      >
    >


  export type ProgressLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    waterL?: boolean
    sleepHrs?: boolean
    mood?: boolean
    weightKg?: boolean
    steps?: boolean
    activeMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progressLog"]>

  export type ProgressLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    waterL?: boolean
    sleepHrs?: boolean
    mood?: boolean
    weightKg?: boolean
    steps?: boolean
    activeMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progressLog"]>

  export type ProgressLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    waterL?: boolean
    sleepHrs?: boolean
    mood?: boolean
    weightKg?: boolean
    steps?: boolean
    activeMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progressLog"]>

  export type ProgressLogSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    waterL?: boolean
    sleepHrs?: boolean
    mood?: boolean
    weightKg?: boolean
    steps?: boolean
    activeMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type ProgressLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "waterL" | "sleepHrs" | "mood" | "weightKg" | "steps" | "activeMinutes" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["progressLog"]>
  export type ProgressLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgressLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgressLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProgressLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgressLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      waterL: number | null
      sleepHrs: number | null
      mood: string | null
      weightKg: number | null
      steps: number | null
      activeMinutes: number | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["progressLog"]>
    composites: {}
  }

  type ProgressLogGetPayload<S extends boolean | null | undefined | ProgressLogDefaultArgs> = $Result.GetResult<Prisma.$ProgressLogPayload, S>

  type ProgressLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgressLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgressLogCountAggregateInputType | true
    }

  export interface ProgressLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgressLog'], meta: { name: 'ProgressLog' } }
    /**
     * Find zero or one ProgressLog that matches the filter.
     * @param {ProgressLogFindUniqueArgs} args - Arguments to find a ProgressLog
     * @example
     * // Get one ProgressLog
     * const progressLog = await prisma.progressLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgressLogFindUniqueArgs>(args: SelectSubset<T, ProgressLogFindUniqueArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgressLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgressLogFindUniqueOrThrowArgs} args - Arguments to find a ProgressLog
     * @example
     * // Get one ProgressLog
     * const progressLog = await prisma.progressLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgressLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgressLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgressLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogFindFirstArgs} args - Arguments to find a ProgressLog
     * @example
     * // Get one ProgressLog
     * const progressLog = await prisma.progressLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgressLogFindFirstArgs>(args?: SelectSubset<T, ProgressLogFindFirstArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgressLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogFindFirstOrThrowArgs} args - Arguments to find a ProgressLog
     * @example
     * // Get one ProgressLog
     * const progressLog = await prisma.progressLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgressLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgressLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgressLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgressLogs
     * const progressLogs = await prisma.progressLog.findMany()
     * 
     * // Get first 10 ProgressLogs
     * const progressLogs = await prisma.progressLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progressLogWithIdOnly = await prisma.progressLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgressLogFindManyArgs>(args?: SelectSubset<T, ProgressLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgressLog.
     * @param {ProgressLogCreateArgs} args - Arguments to create a ProgressLog.
     * @example
     * // Create one ProgressLog
     * const ProgressLog = await prisma.progressLog.create({
     *   data: {
     *     // ... data to create a ProgressLog
     *   }
     * })
     * 
     */
    create<T extends ProgressLogCreateArgs>(args: SelectSubset<T, ProgressLogCreateArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgressLogs.
     * @param {ProgressLogCreateManyArgs} args - Arguments to create many ProgressLogs.
     * @example
     * // Create many ProgressLogs
     * const progressLog = await prisma.progressLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgressLogCreateManyArgs>(args?: SelectSubset<T, ProgressLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgressLogs and returns the data saved in the database.
     * @param {ProgressLogCreateManyAndReturnArgs} args - Arguments to create many ProgressLogs.
     * @example
     * // Create many ProgressLogs
     * const progressLog = await prisma.progressLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgressLogs and only return the `id`
     * const progressLogWithIdOnly = await prisma.progressLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgressLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgressLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgressLog.
     * @param {ProgressLogDeleteArgs} args - Arguments to delete one ProgressLog.
     * @example
     * // Delete one ProgressLog
     * const ProgressLog = await prisma.progressLog.delete({
     *   where: {
     *     // ... filter to delete one ProgressLog
     *   }
     * })
     * 
     */
    delete<T extends ProgressLogDeleteArgs>(args: SelectSubset<T, ProgressLogDeleteArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgressLog.
     * @param {ProgressLogUpdateArgs} args - Arguments to update one ProgressLog.
     * @example
     * // Update one ProgressLog
     * const progressLog = await prisma.progressLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgressLogUpdateArgs>(args: SelectSubset<T, ProgressLogUpdateArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgressLogs.
     * @param {ProgressLogDeleteManyArgs} args - Arguments to filter ProgressLogs to delete.
     * @example
     * // Delete a few ProgressLogs
     * const { count } = await prisma.progressLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgressLogDeleteManyArgs>(args?: SelectSubset<T, ProgressLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgressLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgressLogs
     * const progressLog = await prisma.progressLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgressLogUpdateManyArgs>(args: SelectSubset<T, ProgressLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgressLogs and returns the data updated in the database.
     * @param {ProgressLogUpdateManyAndReturnArgs} args - Arguments to update many ProgressLogs.
     * @example
     * // Update many ProgressLogs
     * const progressLog = await prisma.progressLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgressLogs and only return the `id`
     * const progressLogWithIdOnly = await prisma.progressLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgressLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgressLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgressLog.
     * @param {ProgressLogUpsertArgs} args - Arguments to update or create a ProgressLog.
     * @example
     * // Update or create a ProgressLog
     * const progressLog = await prisma.progressLog.upsert({
     *   create: {
     *     // ... data to create a ProgressLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgressLog we want to update
     *   }
     * })
     */
    upsert<T extends ProgressLogUpsertArgs>(args: SelectSubset<T, ProgressLogUpsertArgs<ExtArgs>>): Prisma__ProgressLogClient<$Result.GetResult<Prisma.$ProgressLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgressLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogCountArgs} args - Arguments to filter ProgressLogs to count.
     * @example
     * // Count the number of ProgressLogs
     * const count = await prisma.progressLog.count({
     *   where: {
     *     // ... the filter for the ProgressLogs we want to count
     *   }
     * })
    **/
    count<T extends ProgressLogCountArgs>(
      args?: Subset<T, ProgressLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgressLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgressLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgressLogAggregateArgs>(args: Subset<T, ProgressLogAggregateArgs>): Prisma.PrismaPromise<GetProgressLogAggregateType<T>>

    /**
     * Group by ProgressLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgressLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgressLogGroupByArgs['orderBy'] }
        : { orderBy?: ProgressLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgressLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgressLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgressLog model
   */
  readonly fields: ProgressLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgressLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgressLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgressLog model
   */
  interface ProgressLogFieldRefs {
    readonly id: FieldRef<"ProgressLog", 'String'>
    readonly userId: FieldRef<"ProgressLog", 'String'>
    readonly date: FieldRef<"ProgressLog", 'DateTime'>
    readonly waterL: FieldRef<"ProgressLog", 'Float'>
    readonly sleepHrs: FieldRef<"ProgressLog", 'Float'>
    readonly mood: FieldRef<"ProgressLog", 'String'>
    readonly weightKg: FieldRef<"ProgressLog", 'Float'>
    readonly steps: FieldRef<"ProgressLog", 'Int'>
    readonly activeMinutes: FieldRef<"ProgressLog", 'Int'>
    readonly createdAt: FieldRef<"ProgressLog", 'DateTime'>
    readonly updatedAt: FieldRef<"ProgressLog", 'DateTime'>
    readonly syncedAt: FieldRef<"ProgressLog", 'DateTime'>
    readonly isDeleted: FieldRef<"ProgressLog", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProgressLog findUnique
   */
  export type ProgressLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * Filter, which ProgressLog to fetch.
     */
    where: ProgressLogWhereUniqueInput
  }

  /**
   * ProgressLog findUniqueOrThrow
   */
  export type ProgressLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * Filter, which ProgressLog to fetch.
     */
    where: ProgressLogWhereUniqueInput
  }

  /**
   * ProgressLog findFirst
   */
  export type ProgressLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * Filter, which ProgressLog to fetch.
     */
    where?: ProgressLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressLogs to fetch.
     */
    orderBy?: ProgressLogOrderByWithRelationInput | ProgressLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgressLogs.
     */
    cursor?: ProgressLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgressLogs.
     */
    distinct?: ProgressLogScalarFieldEnum | ProgressLogScalarFieldEnum[]
  }

  /**
   * ProgressLog findFirstOrThrow
   */
  export type ProgressLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * Filter, which ProgressLog to fetch.
     */
    where?: ProgressLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressLogs to fetch.
     */
    orderBy?: ProgressLogOrderByWithRelationInput | ProgressLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgressLogs.
     */
    cursor?: ProgressLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgressLogs.
     */
    distinct?: ProgressLogScalarFieldEnum | ProgressLogScalarFieldEnum[]
  }

  /**
   * ProgressLog findMany
   */
  export type ProgressLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * Filter, which ProgressLogs to fetch.
     */
    where?: ProgressLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressLogs to fetch.
     */
    orderBy?: ProgressLogOrderByWithRelationInput | ProgressLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgressLogs.
     */
    cursor?: ProgressLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressLogs.
     */
    skip?: number
    distinct?: ProgressLogScalarFieldEnum | ProgressLogScalarFieldEnum[]
  }

  /**
   * ProgressLog create
   */
  export type ProgressLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgressLog.
     */
    data: XOR<ProgressLogCreateInput, ProgressLogUncheckedCreateInput>
  }

  /**
   * ProgressLog createMany
   */
  export type ProgressLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgressLogs.
     */
    data: ProgressLogCreateManyInput | ProgressLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgressLog createManyAndReturn
   */
  export type ProgressLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * The data used to create many ProgressLogs.
     */
    data: ProgressLogCreateManyInput | ProgressLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgressLog update
   */
  export type ProgressLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgressLog.
     */
    data: XOR<ProgressLogUpdateInput, ProgressLogUncheckedUpdateInput>
    /**
     * Choose, which ProgressLog to update.
     */
    where: ProgressLogWhereUniqueInput
  }

  /**
   * ProgressLog updateMany
   */
  export type ProgressLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgressLogs.
     */
    data: XOR<ProgressLogUpdateManyMutationInput, ProgressLogUncheckedUpdateManyInput>
    /**
     * Filter which ProgressLogs to update
     */
    where?: ProgressLogWhereInput
    /**
     * Limit how many ProgressLogs to update.
     */
    limit?: number
  }

  /**
   * ProgressLog updateManyAndReturn
   */
  export type ProgressLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * The data used to update ProgressLogs.
     */
    data: XOR<ProgressLogUpdateManyMutationInput, ProgressLogUncheckedUpdateManyInput>
    /**
     * Filter which ProgressLogs to update
     */
    where?: ProgressLogWhereInput
    /**
     * Limit how many ProgressLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgressLog upsert
   */
  export type ProgressLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgressLog to update in case it exists.
     */
    where: ProgressLogWhereUniqueInput
    /**
     * In case the ProgressLog found by the `where` argument doesn't exist, create a new ProgressLog with this data.
     */
    create: XOR<ProgressLogCreateInput, ProgressLogUncheckedCreateInput>
    /**
     * In case the ProgressLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgressLogUpdateInput, ProgressLogUncheckedUpdateInput>
  }

  /**
   * ProgressLog delete
   */
  export type ProgressLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
    /**
     * Filter which ProgressLog to delete.
     */
    where: ProgressLogWhereUniqueInput
  }

  /**
   * ProgressLog deleteMany
   */
  export type ProgressLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgressLogs to delete
     */
    where?: ProgressLogWhereInput
    /**
     * Limit how many ProgressLogs to delete.
     */
    limit?: number
  }

  /**
   * ProgressLog without action
   */
  export type ProgressLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressLog
     */
    select?: ProgressLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressLog
     */
    omit?: ProgressLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressLogInclude<ExtArgs> | null
  }


  /**
   * Model WeightEntry
   */

  export type AggregateWeightEntry = {
    _count: WeightEntryCountAggregateOutputType | null
    _avg: WeightEntryAvgAggregateOutputType | null
    _sum: WeightEntrySumAggregateOutputType | null
    _min: WeightEntryMinAggregateOutputType | null
    _max: WeightEntryMaxAggregateOutputType | null
  }

  export type WeightEntryAvgAggregateOutputType = {
    weightKg: number | null
    bodyFatPercentage: number | null
    muscleMassKg: number | null
  }

  export type WeightEntrySumAggregateOutputType = {
    weightKg: number | null
    bodyFatPercentage: number | null
    muscleMassKg: number | null
  }

  export type WeightEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    weightKg: number | null
    date: Date | null
    photo: string | null
    notes: string | null
    bodyFatPercentage: number | null
    muscleMassKg: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type WeightEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    weightKg: number | null
    date: Date | null
    photo: string | null
    notes: string | null
    bodyFatPercentage: number | null
    muscleMassKg: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type WeightEntryCountAggregateOutputType = {
    id: number
    userId: number
    weightKg: number
    date: number
    photo: number
    notes: number
    bodyFatPercentage: number
    muscleMassKg: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type WeightEntryAvgAggregateInputType = {
    weightKg?: true
    bodyFatPercentage?: true
    muscleMassKg?: true
  }

  export type WeightEntrySumAggregateInputType = {
    weightKg?: true
    bodyFatPercentage?: true
    muscleMassKg?: true
  }

  export type WeightEntryMinAggregateInputType = {
    id?: true
    userId?: true
    weightKg?: true
    date?: true
    photo?: true
    notes?: true
    bodyFatPercentage?: true
    muscleMassKg?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type WeightEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    weightKg?: true
    date?: true
    photo?: true
    notes?: true
    bodyFatPercentage?: true
    muscleMassKg?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type WeightEntryCountAggregateInputType = {
    id?: true
    userId?: true
    weightKg?: true
    date?: true
    photo?: true
    notes?: true
    bodyFatPercentage?: true
    muscleMassKg?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type WeightEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightEntry to aggregate.
     */
    where?: WeightEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightEntries to fetch.
     */
    orderBy?: WeightEntryOrderByWithRelationInput | WeightEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeightEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeightEntries
    **/
    _count?: true | WeightEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeightEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeightEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeightEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeightEntryMaxAggregateInputType
  }

  export type GetWeightEntryAggregateType<T extends WeightEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateWeightEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeightEntry[P]>
      : GetScalarType<T[P], AggregateWeightEntry[P]>
  }




  export type WeightEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightEntryWhereInput
    orderBy?: WeightEntryOrderByWithAggregationInput | WeightEntryOrderByWithAggregationInput[]
    by: WeightEntryScalarFieldEnum[] | WeightEntryScalarFieldEnum
    having?: WeightEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeightEntryCountAggregateInputType | true
    _avg?: WeightEntryAvgAggregateInputType
    _sum?: WeightEntrySumAggregateInputType
    _min?: WeightEntryMinAggregateInputType
    _max?: WeightEntryMaxAggregateInputType
  }

  export type WeightEntryGroupByOutputType = {
    id: string
    userId: string
    weightKg: number
    date: Date
    photo: string | null
    notes: string | null
    bodyFatPercentage: number | null
    muscleMassKg: number | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: WeightEntryCountAggregateOutputType | null
    _avg: WeightEntryAvgAggregateOutputType | null
    _sum: WeightEntrySumAggregateOutputType | null
    _min: WeightEntryMinAggregateOutputType | null
    _max: WeightEntryMaxAggregateOutputType | null
  }

  type GetWeightEntryGroupByPayload<T extends WeightEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeightEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeightEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeightEntryGroupByOutputType[P]>
            : GetScalarType<T[P], WeightEntryGroupByOutputType[P]>
        }
      >
    >


  export type WeightEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    date?: boolean
    photo?: boolean
    notes?: boolean
    bodyFatPercentage?: boolean
    muscleMassKg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightEntry"]>

  export type WeightEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    date?: boolean
    photo?: boolean
    notes?: boolean
    bodyFatPercentage?: boolean
    muscleMassKg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightEntry"]>

  export type WeightEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    date?: boolean
    photo?: boolean
    notes?: boolean
    bodyFatPercentage?: boolean
    muscleMassKg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightEntry"]>

  export type WeightEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    date?: boolean
    photo?: boolean
    notes?: boolean
    bodyFatPercentage?: boolean
    muscleMassKg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type WeightEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "weightKg" | "date" | "photo" | "notes" | "bodyFatPercentage" | "muscleMassKg" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["weightEntry"]>
  export type WeightEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeightEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeightEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WeightEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeightEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      weightKg: number
      date: Date
      photo: string | null
      notes: string | null
      bodyFatPercentage: number | null
      muscleMassKg: number | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["weightEntry"]>
    composites: {}
  }

  type WeightEntryGetPayload<S extends boolean | null | undefined | WeightEntryDefaultArgs> = $Result.GetResult<Prisma.$WeightEntryPayload, S>

  type WeightEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeightEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeightEntryCountAggregateInputType | true
    }

  export interface WeightEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeightEntry'], meta: { name: 'WeightEntry' } }
    /**
     * Find zero or one WeightEntry that matches the filter.
     * @param {WeightEntryFindUniqueArgs} args - Arguments to find a WeightEntry
     * @example
     * // Get one WeightEntry
     * const weightEntry = await prisma.weightEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeightEntryFindUniqueArgs>(args: SelectSubset<T, WeightEntryFindUniqueArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeightEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeightEntryFindUniqueOrThrowArgs} args - Arguments to find a WeightEntry
     * @example
     * // Get one WeightEntry
     * const weightEntry = await prisma.weightEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeightEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, WeightEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeightEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryFindFirstArgs} args - Arguments to find a WeightEntry
     * @example
     * // Get one WeightEntry
     * const weightEntry = await prisma.weightEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeightEntryFindFirstArgs>(args?: SelectSubset<T, WeightEntryFindFirstArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeightEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryFindFirstOrThrowArgs} args - Arguments to find a WeightEntry
     * @example
     * // Get one WeightEntry
     * const weightEntry = await prisma.weightEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeightEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, WeightEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeightEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeightEntries
     * const weightEntries = await prisma.weightEntry.findMany()
     * 
     * // Get first 10 WeightEntries
     * const weightEntries = await prisma.weightEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weightEntryWithIdOnly = await prisma.weightEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeightEntryFindManyArgs>(args?: SelectSubset<T, WeightEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeightEntry.
     * @param {WeightEntryCreateArgs} args - Arguments to create a WeightEntry.
     * @example
     * // Create one WeightEntry
     * const WeightEntry = await prisma.weightEntry.create({
     *   data: {
     *     // ... data to create a WeightEntry
     *   }
     * })
     * 
     */
    create<T extends WeightEntryCreateArgs>(args: SelectSubset<T, WeightEntryCreateArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeightEntries.
     * @param {WeightEntryCreateManyArgs} args - Arguments to create many WeightEntries.
     * @example
     * // Create many WeightEntries
     * const weightEntry = await prisma.weightEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeightEntryCreateManyArgs>(args?: SelectSubset<T, WeightEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeightEntries and returns the data saved in the database.
     * @param {WeightEntryCreateManyAndReturnArgs} args - Arguments to create many WeightEntries.
     * @example
     * // Create many WeightEntries
     * const weightEntry = await prisma.weightEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeightEntries and only return the `id`
     * const weightEntryWithIdOnly = await prisma.weightEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeightEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, WeightEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeightEntry.
     * @param {WeightEntryDeleteArgs} args - Arguments to delete one WeightEntry.
     * @example
     * // Delete one WeightEntry
     * const WeightEntry = await prisma.weightEntry.delete({
     *   where: {
     *     // ... filter to delete one WeightEntry
     *   }
     * })
     * 
     */
    delete<T extends WeightEntryDeleteArgs>(args: SelectSubset<T, WeightEntryDeleteArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeightEntry.
     * @param {WeightEntryUpdateArgs} args - Arguments to update one WeightEntry.
     * @example
     * // Update one WeightEntry
     * const weightEntry = await prisma.weightEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeightEntryUpdateArgs>(args: SelectSubset<T, WeightEntryUpdateArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeightEntries.
     * @param {WeightEntryDeleteManyArgs} args - Arguments to filter WeightEntries to delete.
     * @example
     * // Delete a few WeightEntries
     * const { count } = await prisma.weightEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeightEntryDeleteManyArgs>(args?: SelectSubset<T, WeightEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeightEntries
     * const weightEntry = await prisma.weightEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeightEntryUpdateManyArgs>(args: SelectSubset<T, WeightEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightEntries and returns the data updated in the database.
     * @param {WeightEntryUpdateManyAndReturnArgs} args - Arguments to update many WeightEntries.
     * @example
     * // Update many WeightEntries
     * const weightEntry = await prisma.weightEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeightEntries and only return the `id`
     * const weightEntryWithIdOnly = await prisma.weightEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeightEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, WeightEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeightEntry.
     * @param {WeightEntryUpsertArgs} args - Arguments to update or create a WeightEntry.
     * @example
     * // Update or create a WeightEntry
     * const weightEntry = await prisma.weightEntry.upsert({
     *   create: {
     *     // ... data to create a WeightEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeightEntry we want to update
     *   }
     * })
     */
    upsert<T extends WeightEntryUpsertArgs>(args: SelectSubset<T, WeightEntryUpsertArgs<ExtArgs>>): Prisma__WeightEntryClient<$Result.GetResult<Prisma.$WeightEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeightEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryCountArgs} args - Arguments to filter WeightEntries to count.
     * @example
     * // Count the number of WeightEntries
     * const count = await prisma.weightEntry.count({
     *   where: {
     *     // ... the filter for the WeightEntries we want to count
     *   }
     * })
    **/
    count<T extends WeightEntryCountArgs>(
      args?: Subset<T, WeightEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeightEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeightEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeightEntryAggregateArgs>(args: Subset<T, WeightEntryAggregateArgs>): Prisma.PrismaPromise<GetWeightEntryAggregateType<T>>

    /**
     * Group by WeightEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeightEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeightEntryGroupByArgs['orderBy'] }
        : { orderBy?: WeightEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeightEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeightEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeightEntry model
   */
  readonly fields: WeightEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeightEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeightEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeightEntry model
   */
  interface WeightEntryFieldRefs {
    readonly id: FieldRef<"WeightEntry", 'String'>
    readonly userId: FieldRef<"WeightEntry", 'String'>
    readonly weightKg: FieldRef<"WeightEntry", 'Float'>
    readonly date: FieldRef<"WeightEntry", 'DateTime'>
    readonly photo: FieldRef<"WeightEntry", 'String'>
    readonly notes: FieldRef<"WeightEntry", 'String'>
    readonly bodyFatPercentage: FieldRef<"WeightEntry", 'Float'>
    readonly muscleMassKg: FieldRef<"WeightEntry", 'Float'>
    readonly createdAt: FieldRef<"WeightEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"WeightEntry", 'DateTime'>
    readonly syncedAt: FieldRef<"WeightEntry", 'DateTime'>
    readonly isDeleted: FieldRef<"WeightEntry", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * WeightEntry findUnique
   */
  export type WeightEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * Filter, which WeightEntry to fetch.
     */
    where: WeightEntryWhereUniqueInput
  }

  /**
   * WeightEntry findUniqueOrThrow
   */
  export type WeightEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * Filter, which WeightEntry to fetch.
     */
    where: WeightEntryWhereUniqueInput
  }

  /**
   * WeightEntry findFirst
   */
  export type WeightEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * Filter, which WeightEntry to fetch.
     */
    where?: WeightEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightEntries to fetch.
     */
    orderBy?: WeightEntryOrderByWithRelationInput | WeightEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightEntries.
     */
    cursor?: WeightEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightEntries.
     */
    distinct?: WeightEntryScalarFieldEnum | WeightEntryScalarFieldEnum[]
  }

  /**
   * WeightEntry findFirstOrThrow
   */
  export type WeightEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * Filter, which WeightEntry to fetch.
     */
    where?: WeightEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightEntries to fetch.
     */
    orderBy?: WeightEntryOrderByWithRelationInput | WeightEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightEntries.
     */
    cursor?: WeightEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightEntries.
     */
    distinct?: WeightEntryScalarFieldEnum | WeightEntryScalarFieldEnum[]
  }

  /**
   * WeightEntry findMany
   */
  export type WeightEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * Filter, which WeightEntries to fetch.
     */
    where?: WeightEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightEntries to fetch.
     */
    orderBy?: WeightEntryOrderByWithRelationInput | WeightEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeightEntries.
     */
    cursor?: WeightEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightEntries.
     */
    skip?: number
    distinct?: WeightEntryScalarFieldEnum | WeightEntryScalarFieldEnum[]
  }

  /**
   * WeightEntry create
   */
  export type WeightEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a WeightEntry.
     */
    data: XOR<WeightEntryCreateInput, WeightEntryUncheckedCreateInput>
  }

  /**
   * WeightEntry createMany
   */
  export type WeightEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeightEntries.
     */
    data: WeightEntryCreateManyInput | WeightEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeightEntry createManyAndReturn
   */
  export type WeightEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * The data used to create many WeightEntries.
     */
    data: WeightEntryCreateManyInput | WeightEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightEntry update
   */
  export type WeightEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a WeightEntry.
     */
    data: XOR<WeightEntryUpdateInput, WeightEntryUncheckedUpdateInput>
    /**
     * Choose, which WeightEntry to update.
     */
    where: WeightEntryWhereUniqueInput
  }

  /**
   * WeightEntry updateMany
   */
  export type WeightEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeightEntries.
     */
    data: XOR<WeightEntryUpdateManyMutationInput, WeightEntryUncheckedUpdateManyInput>
    /**
     * Filter which WeightEntries to update
     */
    where?: WeightEntryWhereInput
    /**
     * Limit how many WeightEntries to update.
     */
    limit?: number
  }

  /**
   * WeightEntry updateManyAndReturn
   */
  export type WeightEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * The data used to update WeightEntries.
     */
    data: XOR<WeightEntryUpdateManyMutationInput, WeightEntryUncheckedUpdateManyInput>
    /**
     * Filter which WeightEntries to update
     */
    where?: WeightEntryWhereInput
    /**
     * Limit how many WeightEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightEntry upsert
   */
  export type WeightEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the WeightEntry to update in case it exists.
     */
    where: WeightEntryWhereUniqueInput
    /**
     * In case the WeightEntry found by the `where` argument doesn't exist, create a new WeightEntry with this data.
     */
    create: XOR<WeightEntryCreateInput, WeightEntryUncheckedCreateInput>
    /**
     * In case the WeightEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeightEntryUpdateInput, WeightEntryUncheckedUpdateInput>
  }

  /**
   * WeightEntry delete
   */
  export type WeightEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
    /**
     * Filter which WeightEntry to delete.
     */
    where: WeightEntryWhereUniqueInput
  }

  /**
   * WeightEntry deleteMany
   */
  export type WeightEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightEntries to delete
     */
    where?: WeightEntryWhereInput
    /**
     * Limit how many WeightEntries to delete.
     */
    limit?: number
  }

  /**
   * WeightEntry without action
   */
  export type WeightEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightEntry
     */
    select?: WeightEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightEntry
     */
    omit?: WeightEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightEntryInclude<ExtArgs> | null
  }


  /**
   * Model WaterIntake
   */

  export type AggregateWaterIntake = {
    _count: WaterIntakeCountAggregateOutputType | null
    _avg: WaterIntakeAvgAggregateOutputType | null
    _sum: WaterIntakeSumAggregateOutputType | null
    _min: WaterIntakeMinAggregateOutputType | null
    _max: WaterIntakeMaxAggregateOutputType | null
  }

  export type WaterIntakeAvgAggregateOutputType = {
    amountMl: number | null
  }

  export type WaterIntakeSumAggregateOutputType = {
    amountMl: number | null
  }

  export type WaterIntakeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amountMl: number | null
    date: Date | null
    time: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type WaterIntakeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amountMl: number | null
    date: Date | null
    time: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type WaterIntakeCountAggregateOutputType = {
    id: number
    userId: number
    amountMl: number
    date: number
    time: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type WaterIntakeAvgAggregateInputType = {
    amountMl?: true
  }

  export type WaterIntakeSumAggregateInputType = {
    amountMl?: true
  }

  export type WaterIntakeMinAggregateInputType = {
    id?: true
    userId?: true
    amountMl?: true
    date?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type WaterIntakeMaxAggregateInputType = {
    id?: true
    userId?: true
    amountMl?: true
    date?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type WaterIntakeCountAggregateInputType = {
    id?: true
    userId?: true
    amountMl?: true
    date?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type WaterIntakeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaterIntake to aggregate.
     */
    where?: WaterIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterIntakes to fetch.
     */
    orderBy?: WaterIntakeOrderByWithRelationInput | WaterIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WaterIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WaterIntakes
    **/
    _count?: true | WaterIntakeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WaterIntakeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WaterIntakeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WaterIntakeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WaterIntakeMaxAggregateInputType
  }

  export type GetWaterIntakeAggregateType<T extends WaterIntakeAggregateArgs> = {
        [P in keyof T & keyof AggregateWaterIntake]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWaterIntake[P]>
      : GetScalarType<T[P], AggregateWaterIntake[P]>
  }




  export type WaterIntakeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaterIntakeWhereInput
    orderBy?: WaterIntakeOrderByWithAggregationInput | WaterIntakeOrderByWithAggregationInput[]
    by: WaterIntakeScalarFieldEnum[] | WaterIntakeScalarFieldEnum
    having?: WaterIntakeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WaterIntakeCountAggregateInputType | true
    _avg?: WaterIntakeAvgAggregateInputType
    _sum?: WaterIntakeSumAggregateInputType
    _min?: WaterIntakeMinAggregateInputType
    _max?: WaterIntakeMaxAggregateInputType
  }

  export type WaterIntakeGroupByOutputType = {
    id: string
    userId: string
    amountMl: number
    date: Date
    time: Date
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: WaterIntakeCountAggregateOutputType | null
    _avg: WaterIntakeAvgAggregateOutputType | null
    _sum: WaterIntakeSumAggregateOutputType | null
    _min: WaterIntakeMinAggregateOutputType | null
    _max: WaterIntakeMaxAggregateOutputType | null
  }

  type GetWaterIntakeGroupByPayload<T extends WaterIntakeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WaterIntakeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WaterIntakeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WaterIntakeGroupByOutputType[P]>
            : GetScalarType<T[P], WaterIntakeGroupByOutputType[P]>
        }
      >
    >


  export type WaterIntakeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amountMl?: boolean
    date?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterIntake"]>

  export type WaterIntakeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amountMl?: boolean
    date?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterIntake"]>

  export type WaterIntakeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amountMl?: boolean
    date?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterIntake"]>

  export type WaterIntakeSelectScalar = {
    id?: boolean
    userId?: boolean
    amountMl?: boolean
    date?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type WaterIntakeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amountMl" | "date" | "time" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["waterIntake"]>
  export type WaterIntakeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WaterIntakeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WaterIntakeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WaterIntakePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WaterIntake"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amountMl: number
      date: Date
      time: Date
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["waterIntake"]>
    composites: {}
  }

  type WaterIntakeGetPayload<S extends boolean | null | undefined | WaterIntakeDefaultArgs> = $Result.GetResult<Prisma.$WaterIntakePayload, S>

  type WaterIntakeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WaterIntakeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WaterIntakeCountAggregateInputType | true
    }

  export interface WaterIntakeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WaterIntake'], meta: { name: 'WaterIntake' } }
    /**
     * Find zero or one WaterIntake that matches the filter.
     * @param {WaterIntakeFindUniqueArgs} args - Arguments to find a WaterIntake
     * @example
     * // Get one WaterIntake
     * const waterIntake = await prisma.waterIntake.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WaterIntakeFindUniqueArgs>(args: SelectSubset<T, WaterIntakeFindUniqueArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WaterIntake that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WaterIntakeFindUniqueOrThrowArgs} args - Arguments to find a WaterIntake
     * @example
     * // Get one WaterIntake
     * const waterIntake = await prisma.waterIntake.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WaterIntakeFindUniqueOrThrowArgs>(args: SelectSubset<T, WaterIntakeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WaterIntake that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeFindFirstArgs} args - Arguments to find a WaterIntake
     * @example
     * // Get one WaterIntake
     * const waterIntake = await prisma.waterIntake.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WaterIntakeFindFirstArgs>(args?: SelectSubset<T, WaterIntakeFindFirstArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WaterIntake that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeFindFirstOrThrowArgs} args - Arguments to find a WaterIntake
     * @example
     * // Get one WaterIntake
     * const waterIntake = await prisma.waterIntake.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WaterIntakeFindFirstOrThrowArgs>(args?: SelectSubset<T, WaterIntakeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WaterIntakes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WaterIntakes
     * const waterIntakes = await prisma.waterIntake.findMany()
     * 
     * // Get first 10 WaterIntakes
     * const waterIntakes = await prisma.waterIntake.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const waterIntakeWithIdOnly = await prisma.waterIntake.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WaterIntakeFindManyArgs>(args?: SelectSubset<T, WaterIntakeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WaterIntake.
     * @param {WaterIntakeCreateArgs} args - Arguments to create a WaterIntake.
     * @example
     * // Create one WaterIntake
     * const WaterIntake = await prisma.waterIntake.create({
     *   data: {
     *     // ... data to create a WaterIntake
     *   }
     * })
     * 
     */
    create<T extends WaterIntakeCreateArgs>(args: SelectSubset<T, WaterIntakeCreateArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WaterIntakes.
     * @param {WaterIntakeCreateManyArgs} args - Arguments to create many WaterIntakes.
     * @example
     * // Create many WaterIntakes
     * const waterIntake = await prisma.waterIntake.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WaterIntakeCreateManyArgs>(args?: SelectSubset<T, WaterIntakeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WaterIntakes and returns the data saved in the database.
     * @param {WaterIntakeCreateManyAndReturnArgs} args - Arguments to create many WaterIntakes.
     * @example
     * // Create many WaterIntakes
     * const waterIntake = await prisma.waterIntake.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WaterIntakes and only return the `id`
     * const waterIntakeWithIdOnly = await prisma.waterIntake.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WaterIntakeCreateManyAndReturnArgs>(args?: SelectSubset<T, WaterIntakeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WaterIntake.
     * @param {WaterIntakeDeleteArgs} args - Arguments to delete one WaterIntake.
     * @example
     * // Delete one WaterIntake
     * const WaterIntake = await prisma.waterIntake.delete({
     *   where: {
     *     // ... filter to delete one WaterIntake
     *   }
     * })
     * 
     */
    delete<T extends WaterIntakeDeleteArgs>(args: SelectSubset<T, WaterIntakeDeleteArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WaterIntake.
     * @param {WaterIntakeUpdateArgs} args - Arguments to update one WaterIntake.
     * @example
     * // Update one WaterIntake
     * const waterIntake = await prisma.waterIntake.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WaterIntakeUpdateArgs>(args: SelectSubset<T, WaterIntakeUpdateArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WaterIntakes.
     * @param {WaterIntakeDeleteManyArgs} args - Arguments to filter WaterIntakes to delete.
     * @example
     * // Delete a few WaterIntakes
     * const { count } = await prisma.waterIntake.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WaterIntakeDeleteManyArgs>(args?: SelectSubset<T, WaterIntakeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaterIntakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WaterIntakes
     * const waterIntake = await prisma.waterIntake.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WaterIntakeUpdateManyArgs>(args: SelectSubset<T, WaterIntakeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaterIntakes and returns the data updated in the database.
     * @param {WaterIntakeUpdateManyAndReturnArgs} args - Arguments to update many WaterIntakes.
     * @example
     * // Update many WaterIntakes
     * const waterIntake = await prisma.waterIntake.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WaterIntakes and only return the `id`
     * const waterIntakeWithIdOnly = await prisma.waterIntake.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WaterIntakeUpdateManyAndReturnArgs>(args: SelectSubset<T, WaterIntakeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WaterIntake.
     * @param {WaterIntakeUpsertArgs} args - Arguments to update or create a WaterIntake.
     * @example
     * // Update or create a WaterIntake
     * const waterIntake = await prisma.waterIntake.upsert({
     *   create: {
     *     // ... data to create a WaterIntake
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WaterIntake we want to update
     *   }
     * })
     */
    upsert<T extends WaterIntakeUpsertArgs>(args: SelectSubset<T, WaterIntakeUpsertArgs<ExtArgs>>): Prisma__WaterIntakeClient<$Result.GetResult<Prisma.$WaterIntakePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WaterIntakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeCountArgs} args - Arguments to filter WaterIntakes to count.
     * @example
     * // Count the number of WaterIntakes
     * const count = await prisma.waterIntake.count({
     *   where: {
     *     // ... the filter for the WaterIntakes we want to count
     *   }
     * })
    **/
    count<T extends WaterIntakeCountArgs>(
      args?: Subset<T, WaterIntakeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WaterIntakeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WaterIntake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WaterIntakeAggregateArgs>(args: Subset<T, WaterIntakeAggregateArgs>): Prisma.PrismaPromise<GetWaterIntakeAggregateType<T>>

    /**
     * Group by WaterIntake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterIntakeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WaterIntakeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WaterIntakeGroupByArgs['orderBy'] }
        : { orderBy?: WaterIntakeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WaterIntakeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWaterIntakeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WaterIntake model
   */
  readonly fields: WaterIntakeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WaterIntake.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WaterIntakeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WaterIntake model
   */
  interface WaterIntakeFieldRefs {
    readonly id: FieldRef<"WaterIntake", 'String'>
    readonly userId: FieldRef<"WaterIntake", 'String'>
    readonly amountMl: FieldRef<"WaterIntake", 'Int'>
    readonly date: FieldRef<"WaterIntake", 'DateTime'>
    readonly time: FieldRef<"WaterIntake", 'DateTime'>
    readonly createdAt: FieldRef<"WaterIntake", 'DateTime'>
    readonly updatedAt: FieldRef<"WaterIntake", 'DateTime'>
    readonly syncedAt: FieldRef<"WaterIntake", 'DateTime'>
    readonly isDeleted: FieldRef<"WaterIntake", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * WaterIntake findUnique
   */
  export type WaterIntakeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WaterIntake to fetch.
     */
    where: WaterIntakeWhereUniqueInput
  }

  /**
   * WaterIntake findUniqueOrThrow
   */
  export type WaterIntakeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WaterIntake to fetch.
     */
    where: WaterIntakeWhereUniqueInput
  }

  /**
   * WaterIntake findFirst
   */
  export type WaterIntakeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WaterIntake to fetch.
     */
    where?: WaterIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterIntakes to fetch.
     */
    orderBy?: WaterIntakeOrderByWithRelationInput | WaterIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaterIntakes.
     */
    cursor?: WaterIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterIntakes.
     */
    distinct?: WaterIntakeScalarFieldEnum | WaterIntakeScalarFieldEnum[]
  }

  /**
   * WaterIntake findFirstOrThrow
   */
  export type WaterIntakeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WaterIntake to fetch.
     */
    where?: WaterIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterIntakes to fetch.
     */
    orderBy?: WaterIntakeOrderByWithRelationInput | WaterIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaterIntakes.
     */
    cursor?: WaterIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterIntakes.
     */
    distinct?: WaterIntakeScalarFieldEnum | WaterIntakeScalarFieldEnum[]
  }

  /**
   * WaterIntake findMany
   */
  export type WaterIntakeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WaterIntakes to fetch.
     */
    where?: WaterIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterIntakes to fetch.
     */
    orderBy?: WaterIntakeOrderByWithRelationInput | WaterIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WaterIntakes.
     */
    cursor?: WaterIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterIntakes.
     */
    skip?: number
    distinct?: WaterIntakeScalarFieldEnum | WaterIntakeScalarFieldEnum[]
  }

  /**
   * WaterIntake create
   */
  export type WaterIntakeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * The data needed to create a WaterIntake.
     */
    data: XOR<WaterIntakeCreateInput, WaterIntakeUncheckedCreateInput>
  }

  /**
   * WaterIntake createMany
   */
  export type WaterIntakeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WaterIntakes.
     */
    data: WaterIntakeCreateManyInput | WaterIntakeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WaterIntake createManyAndReturn
   */
  export type WaterIntakeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * The data used to create many WaterIntakes.
     */
    data: WaterIntakeCreateManyInput | WaterIntakeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaterIntake update
   */
  export type WaterIntakeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * The data needed to update a WaterIntake.
     */
    data: XOR<WaterIntakeUpdateInput, WaterIntakeUncheckedUpdateInput>
    /**
     * Choose, which WaterIntake to update.
     */
    where: WaterIntakeWhereUniqueInput
  }

  /**
   * WaterIntake updateMany
   */
  export type WaterIntakeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WaterIntakes.
     */
    data: XOR<WaterIntakeUpdateManyMutationInput, WaterIntakeUncheckedUpdateManyInput>
    /**
     * Filter which WaterIntakes to update
     */
    where?: WaterIntakeWhereInput
    /**
     * Limit how many WaterIntakes to update.
     */
    limit?: number
  }

  /**
   * WaterIntake updateManyAndReturn
   */
  export type WaterIntakeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * The data used to update WaterIntakes.
     */
    data: XOR<WaterIntakeUpdateManyMutationInput, WaterIntakeUncheckedUpdateManyInput>
    /**
     * Filter which WaterIntakes to update
     */
    where?: WaterIntakeWhereInput
    /**
     * Limit how many WaterIntakes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaterIntake upsert
   */
  export type WaterIntakeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * The filter to search for the WaterIntake to update in case it exists.
     */
    where: WaterIntakeWhereUniqueInput
    /**
     * In case the WaterIntake found by the `where` argument doesn't exist, create a new WaterIntake with this data.
     */
    create: XOR<WaterIntakeCreateInput, WaterIntakeUncheckedCreateInput>
    /**
     * In case the WaterIntake was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WaterIntakeUpdateInput, WaterIntakeUncheckedUpdateInput>
  }

  /**
   * WaterIntake delete
   */
  export type WaterIntakeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
    /**
     * Filter which WaterIntake to delete.
     */
    where: WaterIntakeWhereUniqueInput
  }

  /**
   * WaterIntake deleteMany
   */
  export type WaterIntakeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaterIntakes to delete
     */
    where?: WaterIntakeWhereInput
    /**
     * Limit how many WaterIntakes to delete.
     */
    limit?: number
  }

  /**
   * WaterIntake without action
   */
  export type WaterIntakeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterIntake
     */
    select?: WaterIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaterIntake
     */
    omit?: WaterIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterIntakeInclude<ExtArgs> | null
  }


  /**
   * Model SleepEntry
   */

  export type AggregateSleepEntry = {
    _count: SleepEntryCountAggregateOutputType | null
    _avg: SleepEntryAvgAggregateOutputType | null
    _sum: SleepEntrySumAggregateOutputType | null
    _min: SleepEntryMinAggregateOutputType | null
    _max: SleepEntryMaxAggregateOutputType | null
  }

  export type SleepEntryAvgAggregateOutputType = {
    hours: number | null
  }

  export type SleepEntrySumAggregateOutputType = {
    hours: number | null
  }

  export type SleepEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    hours: number | null
    quality: string | null
    date: Date | null
    bedtime: Date | null
    wakeTime: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type SleepEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    hours: number | null
    quality: string | null
    date: Date | null
    bedtime: Date | null
    wakeTime: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type SleepEntryCountAggregateOutputType = {
    id: number
    userId: number
    hours: number
    quality: number
    date: number
    bedtime: number
    wakeTime: number
    notes: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type SleepEntryAvgAggregateInputType = {
    hours?: true
  }

  export type SleepEntrySumAggregateInputType = {
    hours?: true
  }

  export type SleepEntryMinAggregateInputType = {
    id?: true
    userId?: true
    hours?: true
    quality?: true
    date?: true
    bedtime?: true
    wakeTime?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type SleepEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    hours?: true
    quality?: true
    date?: true
    bedtime?: true
    wakeTime?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type SleepEntryCountAggregateInputType = {
    id?: true
    userId?: true
    hours?: true
    quality?: true
    date?: true
    bedtime?: true
    wakeTime?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type SleepEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SleepEntry to aggregate.
     */
    where?: SleepEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepEntries to fetch.
     */
    orderBy?: SleepEntryOrderByWithRelationInput | SleepEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SleepEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SleepEntries
    **/
    _count?: true | SleepEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SleepEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SleepEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SleepEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SleepEntryMaxAggregateInputType
  }

  export type GetSleepEntryAggregateType<T extends SleepEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateSleepEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSleepEntry[P]>
      : GetScalarType<T[P], AggregateSleepEntry[P]>
  }




  export type SleepEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SleepEntryWhereInput
    orderBy?: SleepEntryOrderByWithAggregationInput | SleepEntryOrderByWithAggregationInput[]
    by: SleepEntryScalarFieldEnum[] | SleepEntryScalarFieldEnum
    having?: SleepEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SleepEntryCountAggregateInputType | true
    _avg?: SleepEntryAvgAggregateInputType
    _sum?: SleepEntrySumAggregateInputType
    _min?: SleepEntryMinAggregateInputType
    _max?: SleepEntryMaxAggregateInputType
  }

  export type SleepEntryGroupByOutputType = {
    id: string
    userId: string
    hours: number
    quality: string
    date: Date
    bedtime: Date | null
    wakeTime: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: SleepEntryCountAggregateOutputType | null
    _avg: SleepEntryAvgAggregateOutputType | null
    _sum: SleepEntrySumAggregateOutputType | null
    _min: SleepEntryMinAggregateOutputType | null
    _max: SleepEntryMaxAggregateOutputType | null
  }

  type GetSleepEntryGroupByPayload<T extends SleepEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SleepEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SleepEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SleepEntryGroupByOutputType[P]>
            : GetScalarType<T[P], SleepEntryGroupByOutputType[P]>
        }
      >
    >


  export type SleepEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hours?: boolean
    quality?: boolean
    date?: boolean
    bedtime?: boolean
    wakeTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sleepEntry"]>

  export type SleepEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hours?: boolean
    quality?: boolean
    date?: boolean
    bedtime?: boolean
    wakeTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sleepEntry"]>

  export type SleepEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hours?: boolean
    quality?: boolean
    date?: boolean
    bedtime?: boolean
    wakeTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sleepEntry"]>

  export type SleepEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    hours?: boolean
    quality?: boolean
    date?: boolean
    bedtime?: boolean
    wakeTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type SleepEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "hours" | "quality" | "date" | "bedtime" | "wakeTime" | "notes" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["sleepEntry"]>
  export type SleepEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SleepEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SleepEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SleepEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SleepEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      hours: number
      quality: string
      date: Date
      bedtime: Date | null
      wakeTime: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["sleepEntry"]>
    composites: {}
  }

  type SleepEntryGetPayload<S extends boolean | null | undefined | SleepEntryDefaultArgs> = $Result.GetResult<Prisma.$SleepEntryPayload, S>

  type SleepEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SleepEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SleepEntryCountAggregateInputType | true
    }

  export interface SleepEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SleepEntry'], meta: { name: 'SleepEntry' } }
    /**
     * Find zero or one SleepEntry that matches the filter.
     * @param {SleepEntryFindUniqueArgs} args - Arguments to find a SleepEntry
     * @example
     * // Get one SleepEntry
     * const sleepEntry = await prisma.sleepEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SleepEntryFindUniqueArgs>(args: SelectSubset<T, SleepEntryFindUniqueArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SleepEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SleepEntryFindUniqueOrThrowArgs} args - Arguments to find a SleepEntry
     * @example
     * // Get one SleepEntry
     * const sleepEntry = await prisma.sleepEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SleepEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, SleepEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SleepEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryFindFirstArgs} args - Arguments to find a SleepEntry
     * @example
     * // Get one SleepEntry
     * const sleepEntry = await prisma.sleepEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SleepEntryFindFirstArgs>(args?: SelectSubset<T, SleepEntryFindFirstArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SleepEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryFindFirstOrThrowArgs} args - Arguments to find a SleepEntry
     * @example
     * // Get one SleepEntry
     * const sleepEntry = await prisma.sleepEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SleepEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, SleepEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SleepEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SleepEntries
     * const sleepEntries = await prisma.sleepEntry.findMany()
     * 
     * // Get first 10 SleepEntries
     * const sleepEntries = await prisma.sleepEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sleepEntryWithIdOnly = await prisma.sleepEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SleepEntryFindManyArgs>(args?: SelectSubset<T, SleepEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SleepEntry.
     * @param {SleepEntryCreateArgs} args - Arguments to create a SleepEntry.
     * @example
     * // Create one SleepEntry
     * const SleepEntry = await prisma.sleepEntry.create({
     *   data: {
     *     // ... data to create a SleepEntry
     *   }
     * })
     * 
     */
    create<T extends SleepEntryCreateArgs>(args: SelectSubset<T, SleepEntryCreateArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SleepEntries.
     * @param {SleepEntryCreateManyArgs} args - Arguments to create many SleepEntries.
     * @example
     * // Create many SleepEntries
     * const sleepEntry = await prisma.sleepEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SleepEntryCreateManyArgs>(args?: SelectSubset<T, SleepEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SleepEntries and returns the data saved in the database.
     * @param {SleepEntryCreateManyAndReturnArgs} args - Arguments to create many SleepEntries.
     * @example
     * // Create many SleepEntries
     * const sleepEntry = await prisma.sleepEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SleepEntries and only return the `id`
     * const sleepEntryWithIdOnly = await prisma.sleepEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SleepEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, SleepEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SleepEntry.
     * @param {SleepEntryDeleteArgs} args - Arguments to delete one SleepEntry.
     * @example
     * // Delete one SleepEntry
     * const SleepEntry = await prisma.sleepEntry.delete({
     *   where: {
     *     // ... filter to delete one SleepEntry
     *   }
     * })
     * 
     */
    delete<T extends SleepEntryDeleteArgs>(args: SelectSubset<T, SleepEntryDeleteArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SleepEntry.
     * @param {SleepEntryUpdateArgs} args - Arguments to update one SleepEntry.
     * @example
     * // Update one SleepEntry
     * const sleepEntry = await prisma.sleepEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SleepEntryUpdateArgs>(args: SelectSubset<T, SleepEntryUpdateArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SleepEntries.
     * @param {SleepEntryDeleteManyArgs} args - Arguments to filter SleepEntries to delete.
     * @example
     * // Delete a few SleepEntries
     * const { count } = await prisma.sleepEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SleepEntryDeleteManyArgs>(args?: SelectSubset<T, SleepEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SleepEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SleepEntries
     * const sleepEntry = await prisma.sleepEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SleepEntryUpdateManyArgs>(args: SelectSubset<T, SleepEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SleepEntries and returns the data updated in the database.
     * @param {SleepEntryUpdateManyAndReturnArgs} args - Arguments to update many SleepEntries.
     * @example
     * // Update many SleepEntries
     * const sleepEntry = await prisma.sleepEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SleepEntries and only return the `id`
     * const sleepEntryWithIdOnly = await prisma.sleepEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SleepEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, SleepEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SleepEntry.
     * @param {SleepEntryUpsertArgs} args - Arguments to update or create a SleepEntry.
     * @example
     * // Update or create a SleepEntry
     * const sleepEntry = await prisma.sleepEntry.upsert({
     *   create: {
     *     // ... data to create a SleepEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SleepEntry we want to update
     *   }
     * })
     */
    upsert<T extends SleepEntryUpsertArgs>(args: SelectSubset<T, SleepEntryUpsertArgs<ExtArgs>>): Prisma__SleepEntryClient<$Result.GetResult<Prisma.$SleepEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SleepEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryCountArgs} args - Arguments to filter SleepEntries to count.
     * @example
     * // Count the number of SleepEntries
     * const count = await prisma.sleepEntry.count({
     *   where: {
     *     // ... the filter for the SleepEntries we want to count
     *   }
     * })
    **/
    count<T extends SleepEntryCountArgs>(
      args?: Subset<T, SleepEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SleepEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SleepEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SleepEntryAggregateArgs>(args: Subset<T, SleepEntryAggregateArgs>): Prisma.PrismaPromise<GetSleepEntryAggregateType<T>>

    /**
     * Group by SleepEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SleepEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SleepEntryGroupByArgs['orderBy'] }
        : { orderBy?: SleepEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SleepEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSleepEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SleepEntry model
   */
  readonly fields: SleepEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SleepEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SleepEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SleepEntry model
   */
  interface SleepEntryFieldRefs {
    readonly id: FieldRef<"SleepEntry", 'String'>
    readonly userId: FieldRef<"SleepEntry", 'String'>
    readonly hours: FieldRef<"SleepEntry", 'Float'>
    readonly quality: FieldRef<"SleepEntry", 'String'>
    readonly date: FieldRef<"SleepEntry", 'DateTime'>
    readonly bedtime: FieldRef<"SleepEntry", 'DateTime'>
    readonly wakeTime: FieldRef<"SleepEntry", 'DateTime'>
    readonly notes: FieldRef<"SleepEntry", 'String'>
    readonly createdAt: FieldRef<"SleepEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"SleepEntry", 'DateTime'>
    readonly syncedAt: FieldRef<"SleepEntry", 'DateTime'>
    readonly isDeleted: FieldRef<"SleepEntry", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * SleepEntry findUnique
   */
  export type SleepEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * Filter, which SleepEntry to fetch.
     */
    where: SleepEntryWhereUniqueInput
  }

  /**
   * SleepEntry findUniqueOrThrow
   */
  export type SleepEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * Filter, which SleepEntry to fetch.
     */
    where: SleepEntryWhereUniqueInput
  }

  /**
   * SleepEntry findFirst
   */
  export type SleepEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * Filter, which SleepEntry to fetch.
     */
    where?: SleepEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepEntries to fetch.
     */
    orderBy?: SleepEntryOrderByWithRelationInput | SleepEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SleepEntries.
     */
    cursor?: SleepEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SleepEntries.
     */
    distinct?: SleepEntryScalarFieldEnum | SleepEntryScalarFieldEnum[]
  }

  /**
   * SleepEntry findFirstOrThrow
   */
  export type SleepEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * Filter, which SleepEntry to fetch.
     */
    where?: SleepEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepEntries to fetch.
     */
    orderBy?: SleepEntryOrderByWithRelationInput | SleepEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SleepEntries.
     */
    cursor?: SleepEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SleepEntries.
     */
    distinct?: SleepEntryScalarFieldEnum | SleepEntryScalarFieldEnum[]
  }

  /**
   * SleepEntry findMany
   */
  export type SleepEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * Filter, which SleepEntries to fetch.
     */
    where?: SleepEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepEntries to fetch.
     */
    orderBy?: SleepEntryOrderByWithRelationInput | SleepEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SleepEntries.
     */
    cursor?: SleepEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepEntries.
     */
    skip?: number
    distinct?: SleepEntryScalarFieldEnum | SleepEntryScalarFieldEnum[]
  }

  /**
   * SleepEntry create
   */
  export type SleepEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a SleepEntry.
     */
    data: XOR<SleepEntryCreateInput, SleepEntryUncheckedCreateInput>
  }

  /**
   * SleepEntry createMany
   */
  export type SleepEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SleepEntries.
     */
    data: SleepEntryCreateManyInput | SleepEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SleepEntry createManyAndReturn
   */
  export type SleepEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * The data used to create many SleepEntries.
     */
    data: SleepEntryCreateManyInput | SleepEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SleepEntry update
   */
  export type SleepEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a SleepEntry.
     */
    data: XOR<SleepEntryUpdateInput, SleepEntryUncheckedUpdateInput>
    /**
     * Choose, which SleepEntry to update.
     */
    where: SleepEntryWhereUniqueInput
  }

  /**
   * SleepEntry updateMany
   */
  export type SleepEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SleepEntries.
     */
    data: XOR<SleepEntryUpdateManyMutationInput, SleepEntryUncheckedUpdateManyInput>
    /**
     * Filter which SleepEntries to update
     */
    where?: SleepEntryWhereInput
    /**
     * Limit how many SleepEntries to update.
     */
    limit?: number
  }

  /**
   * SleepEntry updateManyAndReturn
   */
  export type SleepEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * The data used to update SleepEntries.
     */
    data: XOR<SleepEntryUpdateManyMutationInput, SleepEntryUncheckedUpdateManyInput>
    /**
     * Filter which SleepEntries to update
     */
    where?: SleepEntryWhereInput
    /**
     * Limit how many SleepEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SleepEntry upsert
   */
  export type SleepEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the SleepEntry to update in case it exists.
     */
    where: SleepEntryWhereUniqueInput
    /**
     * In case the SleepEntry found by the `where` argument doesn't exist, create a new SleepEntry with this data.
     */
    create: XOR<SleepEntryCreateInput, SleepEntryUncheckedCreateInput>
    /**
     * In case the SleepEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SleepEntryUpdateInput, SleepEntryUncheckedUpdateInput>
  }

  /**
   * SleepEntry delete
   */
  export type SleepEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
    /**
     * Filter which SleepEntry to delete.
     */
    where: SleepEntryWhereUniqueInput
  }

  /**
   * SleepEntry deleteMany
   */
  export type SleepEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SleepEntries to delete
     */
    where?: SleepEntryWhereInput
    /**
     * Limit how many SleepEntries to delete.
     */
    limit?: number
  }

  /**
   * SleepEntry without action
   */
  export type SleepEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepEntry
     */
    select?: SleepEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepEntry
     */
    omit?: SleepEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepEntryInclude<ExtArgs> | null
  }


  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalAvgAggregateOutputType = {
    target: number | null
    current: number | null
  }

  export type GoalSumAggregateOutputType = {
    target: number | null
    current: number | null
  }

  export type GoalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    target: number | null
    current: number | null
    unit: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type GoalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    target: number | null
    current: number | null
    unit: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
    isDeleted: boolean | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    target: number
    current: number
    unit: number
    startDate: number
    endDate: number
    isActive: number
    notes: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    isDeleted: number
    _all: number
  }


  export type GoalAvgAggregateInputType = {
    target?: true
    current?: true
  }

  export type GoalSumAggregateInputType = {
    target?: true
    current?: true
  }

  export type GoalMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    target?: true
    current?: true
    unit?: true
    startDate?: true
    endDate?: true
    isActive?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    target?: true
    current?: true
    unit?: true
    startDate?: true
    endDate?: true
    isActive?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    target?: true
    current?: true
    unit?: true
    startDate?: true
    endDate?: true
    isActive?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    isDeleted?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _avg?: GoalAvgAggregateInputType
    _sum?: GoalSumAggregateInputType
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: string
    userId: string
    type: string
    target: number
    current: number
    unit: string
    startDate: Date
    endDate: Date | null
    isActive: boolean
    notes: string | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    isDeleted: boolean
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    target?: boolean
    current?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    target?: boolean
    current?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    target?: boolean
    current?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    target?: boolean
    current?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    isDeleted?: boolean
  }

  export type GoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "target" | "current" | "unit" | "startDate" | "endDate" | "isActive" | "notes" | "createdAt" | "updatedAt" | "syncedAt" | "isDeleted", ExtArgs["result"]["goal"]>
  export type GoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      target: number
      current: number
      unit: string
      startDate: Date
      endDate: Date | null
      isActive: boolean
      notes: string | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
      isDeleted: boolean
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals and returns the data updated in the database.
     * @param {GoalUpdateManyAndReturnArgs} args - Arguments to update many Goals.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goal model
   */
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'String'>
    readonly userId: FieldRef<"Goal", 'String'>
    readonly type: FieldRef<"Goal", 'String'>
    readonly target: FieldRef<"Goal", 'Float'>
    readonly current: FieldRef<"Goal", 'Float'>
    readonly unit: FieldRef<"Goal", 'String'>
    readonly startDate: FieldRef<"Goal", 'DateTime'>
    readonly endDate: FieldRef<"Goal", 'DateTime'>
    readonly isActive: FieldRef<"Goal", 'Boolean'>
    readonly notes: FieldRef<"Goal", 'String'>
    readonly createdAt: FieldRef<"Goal", 'DateTime'>
    readonly updatedAt: FieldRef<"Goal", 'DateTime'>
    readonly syncedAt: FieldRef<"Goal", 'DateTime'>
    readonly isDeleted: FieldRef<"Goal", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal updateManyAndReturn
   */
  export type GoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to delete.
     */
    limit?: number
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const HealthProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    height: 'height',
    weight: 'weight',
    age: 'age',
    gender: 'gender',
    birthday: 'birthday',
    targetWeight: 'targetWeight',
    targetCalories: 'targetCalories',
    targetWaterL: 'targetWaterL',
    activityLevel: 'activityLevel',
    fitnessGoal: 'fitnessGoal',
    heightUnit: 'heightUnit',
    weightUnit: 'weightUnit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type HealthProfileScalarFieldEnum = (typeof HealthProfileScalarFieldEnum)[keyof typeof HealthProfileScalarFieldEnum]


  export const WorkoutScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    category: 'category',
    durationMin: 'durationMin',
    calories: 'calories',
    date: 'date',
    notes: 'notes',
    isCompleted: 'isCompleted',
    totalTime: 'totalTime',
    restTime: 'restTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type WorkoutScalarFieldEnum = (typeof WorkoutScalarFieldEnum)[keyof typeof WorkoutScalarFieldEnum]


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    workoutId: 'workoutId',
    name: 'name',
    sets: 'sets',
    reps: 'reps',
    weightKg: 'weightKg',
    duration: 'duration',
    distance: 'distance',
    restTime: 'restTime',
    order: 'order',
    isCompleted: 'isCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const MealScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    mealType: 'mealType',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    date: 'date',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type MealScalarFieldEnum = (typeof MealScalarFieldEnum)[keyof typeof MealScalarFieldEnum]


  export const MealItemScalarFieldEnum: {
    id: 'id',
    mealId: 'mealId',
    userId: 'userId',
    name: 'name',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    quantity: 'quantity',
    unit: 'unit',
    isHighInProtein: 'isHighInProtein',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type MealItemScalarFieldEnum = (typeof MealItemScalarFieldEnum)[keyof typeof MealItemScalarFieldEnum]


  export const ProgressLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    waterL: 'waterL',
    sleepHrs: 'sleepHrs',
    mood: 'mood',
    weightKg: 'weightKg',
    steps: 'steps',
    activeMinutes: 'activeMinutes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type ProgressLogScalarFieldEnum = (typeof ProgressLogScalarFieldEnum)[keyof typeof ProgressLogScalarFieldEnum]


  export const WeightEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    weightKg: 'weightKg',
    date: 'date',
    photo: 'photo',
    notes: 'notes',
    bodyFatPercentage: 'bodyFatPercentage',
    muscleMassKg: 'muscleMassKg',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type WeightEntryScalarFieldEnum = (typeof WeightEntryScalarFieldEnum)[keyof typeof WeightEntryScalarFieldEnum]


  export const WaterIntakeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amountMl: 'amountMl',
    date: 'date',
    time: 'time',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type WaterIntakeScalarFieldEnum = (typeof WaterIntakeScalarFieldEnum)[keyof typeof WaterIntakeScalarFieldEnum]


  export const SleepEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    hours: 'hours',
    quality: 'quality',
    date: 'date',
    bedtime: 'bedtime',
    wakeTime: 'wakeTime',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type SleepEntryScalarFieldEnum = (typeof SleepEntryScalarFieldEnum)[keyof typeof SleepEntryScalarFieldEnum]


  export const GoalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    target: 'target',
    current: 'current',
    unit: 'unit',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt',
    isDeleted: 'isDeleted'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    healthProfiles?: HealthProfileListRelationFilter
    workouts?: WorkoutListRelationFilter
    meals?: MealListRelationFilter
    mealItems?: MealItemListRelationFilter
    progressLogs?: ProgressLogListRelationFilter
    weightEntries?: WeightEntryListRelationFilter
    waterIntake?: WaterIntakeListRelationFilter
    sleepEntries?: SleepEntryListRelationFilter
    goals?: GoalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    healthProfiles?: HealthProfileOrderByRelationAggregateInput
    workouts?: WorkoutOrderByRelationAggregateInput
    meals?: MealOrderByRelationAggregateInput
    mealItems?: MealItemOrderByRelationAggregateInput
    progressLogs?: ProgressLogOrderByRelationAggregateInput
    weightEntries?: WeightEntryOrderByRelationAggregateInput
    waterIntake?: WaterIntakeOrderByRelationAggregateInput
    sleepEntries?: SleepEntryOrderByRelationAggregateInput
    goals?: GoalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    healthProfiles?: HealthProfileListRelationFilter
    workouts?: WorkoutListRelationFilter
    meals?: MealListRelationFilter
    mealItems?: MealItemListRelationFilter
    progressLogs?: ProgressLogListRelationFilter
    weightEntries?: WeightEntryListRelationFilter
    waterIntake?: WaterIntakeListRelationFilter
    sleepEntries?: SleepEntryListRelationFilter
    goals?: GoalListRelationFilter
  }, "id" | "clerkId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type HealthProfileWhereInput = {
    AND?: HealthProfileWhereInput | HealthProfileWhereInput[]
    OR?: HealthProfileWhereInput[]
    NOT?: HealthProfileWhereInput | HealthProfileWhereInput[]
    id?: StringFilter<"HealthProfile"> | string
    userId?: StringFilter<"HealthProfile"> | string
    height?: FloatNullableFilter<"HealthProfile"> | number | null
    weight?: FloatNullableFilter<"HealthProfile"> | number | null
    age?: IntNullableFilter<"HealthProfile"> | number | null
    gender?: StringNullableFilter<"HealthProfile"> | string | null
    birthday?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    targetWeight?: FloatNullableFilter<"HealthProfile"> | number | null
    targetCalories?: IntNullableFilter<"HealthProfile"> | number | null
    targetWaterL?: FloatNullableFilter<"HealthProfile"> | number | null
    activityLevel?: StringNullableFilter<"HealthProfile"> | string | null
    fitnessGoal?: StringNullableFilter<"HealthProfile"> | string | null
    heightUnit?: StringNullableFilter<"HealthProfile"> | string | null
    weightUnit?: StringNullableFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeFilter<"HealthProfile"> | Date | string
    syncedAt?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    isDeleted?: BoolFilter<"HealthProfile"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HealthProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    targetWeight?: SortOrderInput | SortOrder
    targetCalories?: SortOrderInput | SortOrder
    targetWaterL?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    fitnessGoal?: SortOrderInput | SortOrder
    heightUnit?: SortOrderInput | SortOrder
    weightUnit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type HealthProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HealthProfileWhereInput | HealthProfileWhereInput[]
    OR?: HealthProfileWhereInput[]
    NOT?: HealthProfileWhereInput | HealthProfileWhereInput[]
    userId?: StringFilter<"HealthProfile"> | string
    height?: FloatNullableFilter<"HealthProfile"> | number | null
    weight?: FloatNullableFilter<"HealthProfile"> | number | null
    age?: IntNullableFilter<"HealthProfile"> | number | null
    gender?: StringNullableFilter<"HealthProfile"> | string | null
    birthday?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    targetWeight?: FloatNullableFilter<"HealthProfile"> | number | null
    targetCalories?: IntNullableFilter<"HealthProfile"> | number | null
    targetWaterL?: FloatNullableFilter<"HealthProfile"> | number | null
    activityLevel?: StringNullableFilter<"HealthProfile"> | string | null
    fitnessGoal?: StringNullableFilter<"HealthProfile"> | string | null
    heightUnit?: StringNullableFilter<"HealthProfile"> | string | null
    weightUnit?: StringNullableFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeFilter<"HealthProfile"> | Date | string
    syncedAt?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    isDeleted?: BoolFilter<"HealthProfile"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type HealthProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    targetWeight?: SortOrderInput | SortOrder
    targetCalories?: SortOrderInput | SortOrder
    targetWaterL?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    fitnessGoal?: SortOrderInput | SortOrder
    heightUnit?: SortOrderInput | SortOrder
    weightUnit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: HealthProfileCountOrderByAggregateInput
    _avg?: HealthProfileAvgOrderByAggregateInput
    _max?: HealthProfileMaxOrderByAggregateInput
    _min?: HealthProfileMinOrderByAggregateInput
    _sum?: HealthProfileSumOrderByAggregateInput
  }

  export type HealthProfileScalarWhereWithAggregatesInput = {
    AND?: HealthProfileScalarWhereWithAggregatesInput | HealthProfileScalarWhereWithAggregatesInput[]
    OR?: HealthProfileScalarWhereWithAggregatesInput[]
    NOT?: HealthProfileScalarWhereWithAggregatesInput | HealthProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HealthProfile"> | string
    userId?: StringWithAggregatesFilter<"HealthProfile"> | string
    height?: FloatNullableWithAggregatesFilter<"HealthProfile"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"HealthProfile"> | number | null
    age?: IntNullableWithAggregatesFilter<"HealthProfile"> | number | null
    gender?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    birthday?: DateTimeNullableWithAggregatesFilter<"HealthProfile"> | Date | string | null
    targetWeight?: FloatNullableWithAggregatesFilter<"HealthProfile"> | number | null
    targetCalories?: IntNullableWithAggregatesFilter<"HealthProfile"> | number | null
    targetWaterL?: FloatNullableWithAggregatesFilter<"HealthProfile"> | number | null
    activityLevel?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    fitnessGoal?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    heightUnit?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    weightUnit?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HealthProfile"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"HealthProfile"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"HealthProfile"> | boolean
  }

  export type WorkoutWhereInput = {
    AND?: WorkoutWhereInput | WorkoutWhereInput[]
    OR?: WorkoutWhereInput[]
    NOT?: WorkoutWhereInput | WorkoutWhereInput[]
    id?: StringFilter<"Workout"> | string
    userId?: StringFilter<"Workout"> | string
    title?: StringFilter<"Workout"> | string
    category?: StringFilter<"Workout"> | string
    durationMin?: IntNullableFilter<"Workout"> | number | null
    calories?: IntNullableFilter<"Workout"> | number | null
    date?: DateTimeFilter<"Workout"> | Date | string
    notes?: StringNullableFilter<"Workout"> | string | null
    isCompleted?: BoolFilter<"Workout"> | boolean
    totalTime?: IntNullableFilter<"Workout"> | number | null
    restTime?: IntNullableFilter<"Workout"> | number | null
    createdAt?: DateTimeFilter<"Workout"> | Date | string
    updatedAt?: DateTimeFilter<"Workout"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Workout"> | Date | string | null
    isDeleted?: BoolFilter<"Workout"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    exercises?: ExerciseListRelationFilter
  }

  export type WorkoutOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    durationMin?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    totalTime?: SortOrderInput | SortOrder
    restTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
    exercises?: ExerciseOrderByRelationAggregateInput
  }

  export type WorkoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkoutWhereInput | WorkoutWhereInput[]
    OR?: WorkoutWhereInput[]
    NOT?: WorkoutWhereInput | WorkoutWhereInput[]
    userId?: StringFilter<"Workout"> | string
    title?: StringFilter<"Workout"> | string
    category?: StringFilter<"Workout"> | string
    durationMin?: IntNullableFilter<"Workout"> | number | null
    calories?: IntNullableFilter<"Workout"> | number | null
    date?: DateTimeFilter<"Workout"> | Date | string
    notes?: StringNullableFilter<"Workout"> | string | null
    isCompleted?: BoolFilter<"Workout"> | boolean
    totalTime?: IntNullableFilter<"Workout"> | number | null
    restTime?: IntNullableFilter<"Workout"> | number | null
    createdAt?: DateTimeFilter<"Workout"> | Date | string
    updatedAt?: DateTimeFilter<"Workout"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Workout"> | Date | string | null
    isDeleted?: BoolFilter<"Workout"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    exercises?: ExerciseListRelationFilter
  }, "id">

  export type WorkoutOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    durationMin?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    totalTime?: SortOrderInput | SortOrder
    restTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: WorkoutCountOrderByAggregateInput
    _avg?: WorkoutAvgOrderByAggregateInput
    _max?: WorkoutMaxOrderByAggregateInput
    _min?: WorkoutMinOrderByAggregateInput
    _sum?: WorkoutSumOrderByAggregateInput
  }

  export type WorkoutScalarWhereWithAggregatesInput = {
    AND?: WorkoutScalarWhereWithAggregatesInput | WorkoutScalarWhereWithAggregatesInput[]
    OR?: WorkoutScalarWhereWithAggregatesInput[]
    NOT?: WorkoutScalarWhereWithAggregatesInput | WorkoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workout"> | string
    userId?: StringWithAggregatesFilter<"Workout"> | string
    title?: StringWithAggregatesFilter<"Workout"> | string
    category?: StringWithAggregatesFilter<"Workout"> | string
    durationMin?: IntNullableWithAggregatesFilter<"Workout"> | number | null
    calories?: IntNullableWithAggregatesFilter<"Workout"> | number | null
    date?: DateTimeWithAggregatesFilter<"Workout"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Workout"> | string | null
    isCompleted?: BoolWithAggregatesFilter<"Workout"> | boolean
    totalTime?: IntNullableWithAggregatesFilter<"Workout"> | number | null
    restTime?: IntNullableWithAggregatesFilter<"Workout"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Workout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workout"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"Workout"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"Workout"> | boolean
  }

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: StringFilter<"Exercise"> | string
    workoutId?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    sets?: IntNullableFilter<"Exercise"> | number | null
    reps?: IntNullableFilter<"Exercise"> | number | null
    weightKg?: FloatNullableFilter<"Exercise"> | number | null
    duration?: IntNullableFilter<"Exercise"> | number | null
    distance?: FloatNullableFilter<"Exercise"> | number | null
    restTime?: IntNullableFilter<"Exercise"> | number | null
    order?: IntFilter<"Exercise"> | number
    isCompleted?: BoolFilter<"Exercise"> | boolean
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Exercise"> | Date | string | null
    isDeleted?: BoolFilter<"Exercise"> | boolean
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    workoutId?: SortOrder
    name?: SortOrder
    sets?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    restTime?: SortOrderInput | SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    workout?: WorkoutOrderByWithRelationInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    workoutId?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    sets?: IntNullableFilter<"Exercise"> | number | null
    reps?: IntNullableFilter<"Exercise"> | number | null
    weightKg?: FloatNullableFilter<"Exercise"> | number | null
    duration?: IntNullableFilter<"Exercise"> | number | null
    distance?: FloatNullableFilter<"Exercise"> | number | null
    restTime?: IntNullableFilter<"Exercise"> | number | null
    order?: IntFilter<"Exercise"> | number
    isCompleted?: BoolFilter<"Exercise"> | boolean
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Exercise"> | Date | string | null
    isDeleted?: BoolFilter<"Exercise"> | boolean
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>
  }, "id">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    workoutId?: SortOrder
    name?: SortOrder
    sets?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    restTime?: SortOrderInput | SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _avg?: ExerciseAvgOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
    _sum?: ExerciseSumOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exercise"> | string
    workoutId?: StringWithAggregatesFilter<"Exercise"> | string
    name?: StringWithAggregatesFilter<"Exercise"> | string
    sets?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    reps?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    weightKg?: FloatNullableWithAggregatesFilter<"Exercise"> | number | null
    duration?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    distance?: FloatNullableWithAggregatesFilter<"Exercise"> | number | null
    restTime?: IntNullableWithAggregatesFilter<"Exercise"> | number | null
    order?: IntWithAggregatesFilter<"Exercise"> | number
    isCompleted?: BoolWithAggregatesFilter<"Exercise"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"Exercise"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"Exercise"> | boolean
  }

  export type MealWhereInput = {
    AND?: MealWhereInput | MealWhereInput[]
    OR?: MealWhereInput[]
    NOT?: MealWhereInput | MealWhereInput[]
    id?: StringFilter<"Meal"> | string
    userId?: StringFilter<"Meal"> | string
    name?: StringFilter<"Meal"> | string
    mealType?: StringFilter<"Meal"> | string
    calories?: IntNullableFilter<"Meal"> | number | null
    protein?: FloatNullableFilter<"Meal"> | number | null
    carbs?: FloatNullableFilter<"Meal"> | number | null
    fat?: FloatNullableFilter<"Meal"> | number | null
    date?: DateTimeFilter<"Meal"> | Date | string
    notes?: StringNullableFilter<"Meal"> | string | null
    createdAt?: DateTimeFilter<"Meal"> | Date | string
    updatedAt?: DateTimeFilter<"Meal"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Meal"> | Date | string | null
    isDeleted?: BoolFilter<"Meal"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mealItems?: MealItemListRelationFilter
  }

  export type MealOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    mealType?: SortOrder
    calories?: SortOrderInput | SortOrder
    protein?: SortOrderInput | SortOrder
    carbs?: SortOrderInput | SortOrder
    fat?: SortOrderInput | SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
    mealItems?: MealItemOrderByRelationAggregateInput
  }

  export type MealWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealWhereInput | MealWhereInput[]
    OR?: MealWhereInput[]
    NOT?: MealWhereInput | MealWhereInput[]
    userId?: StringFilter<"Meal"> | string
    name?: StringFilter<"Meal"> | string
    mealType?: StringFilter<"Meal"> | string
    calories?: IntNullableFilter<"Meal"> | number | null
    protein?: FloatNullableFilter<"Meal"> | number | null
    carbs?: FloatNullableFilter<"Meal"> | number | null
    fat?: FloatNullableFilter<"Meal"> | number | null
    date?: DateTimeFilter<"Meal"> | Date | string
    notes?: StringNullableFilter<"Meal"> | string | null
    createdAt?: DateTimeFilter<"Meal"> | Date | string
    updatedAt?: DateTimeFilter<"Meal"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Meal"> | Date | string | null
    isDeleted?: BoolFilter<"Meal"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mealItems?: MealItemListRelationFilter
  }, "id">

  export type MealOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    mealType?: SortOrder
    calories?: SortOrderInput | SortOrder
    protein?: SortOrderInput | SortOrder
    carbs?: SortOrderInput | SortOrder
    fat?: SortOrderInput | SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: MealCountOrderByAggregateInput
    _avg?: MealAvgOrderByAggregateInput
    _max?: MealMaxOrderByAggregateInput
    _min?: MealMinOrderByAggregateInput
    _sum?: MealSumOrderByAggregateInput
  }

  export type MealScalarWhereWithAggregatesInput = {
    AND?: MealScalarWhereWithAggregatesInput | MealScalarWhereWithAggregatesInput[]
    OR?: MealScalarWhereWithAggregatesInput[]
    NOT?: MealScalarWhereWithAggregatesInput | MealScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Meal"> | string
    userId?: StringWithAggregatesFilter<"Meal"> | string
    name?: StringWithAggregatesFilter<"Meal"> | string
    mealType?: StringWithAggregatesFilter<"Meal"> | string
    calories?: IntNullableWithAggregatesFilter<"Meal"> | number | null
    protein?: FloatNullableWithAggregatesFilter<"Meal"> | number | null
    carbs?: FloatNullableWithAggregatesFilter<"Meal"> | number | null
    fat?: FloatNullableWithAggregatesFilter<"Meal"> | number | null
    date?: DateTimeWithAggregatesFilter<"Meal"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Meal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Meal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Meal"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"Meal"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"Meal"> | boolean
  }

  export type MealItemWhereInput = {
    AND?: MealItemWhereInput | MealItemWhereInput[]
    OR?: MealItemWhereInput[]
    NOT?: MealItemWhereInput | MealItemWhereInput[]
    id?: StringFilter<"MealItem"> | string
    mealId?: StringFilter<"MealItem"> | string
    userId?: StringFilter<"MealItem"> | string
    name?: StringFilter<"MealItem"> | string
    calories?: IntNullableFilter<"MealItem"> | number | null
    protein?: FloatNullableFilter<"MealItem"> | number | null
    carbs?: FloatNullableFilter<"MealItem"> | number | null
    fat?: FloatNullableFilter<"MealItem"> | number | null
    quantity?: FloatNullableFilter<"MealItem"> | number | null
    unit?: StringNullableFilter<"MealItem"> | string | null
    isHighInProtein?: BoolFilter<"MealItem"> | boolean
    createdAt?: DateTimeFilter<"MealItem"> | Date | string
    updatedAt?: DateTimeFilter<"MealItem"> | Date | string
    syncedAt?: DateTimeNullableFilter<"MealItem"> | Date | string | null
    isDeleted?: BoolFilter<"MealItem"> | boolean
    meal?: XOR<MealScalarRelationFilter, MealWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MealItemOrderByWithRelationInput = {
    id?: SortOrder
    mealId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    calories?: SortOrderInput | SortOrder
    protein?: SortOrderInput | SortOrder
    carbs?: SortOrderInput | SortOrder
    fat?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    isHighInProtein?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    meal?: MealOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MealItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealItemWhereInput | MealItemWhereInput[]
    OR?: MealItemWhereInput[]
    NOT?: MealItemWhereInput | MealItemWhereInput[]
    mealId?: StringFilter<"MealItem"> | string
    userId?: StringFilter<"MealItem"> | string
    name?: StringFilter<"MealItem"> | string
    calories?: IntNullableFilter<"MealItem"> | number | null
    protein?: FloatNullableFilter<"MealItem"> | number | null
    carbs?: FloatNullableFilter<"MealItem"> | number | null
    fat?: FloatNullableFilter<"MealItem"> | number | null
    quantity?: FloatNullableFilter<"MealItem"> | number | null
    unit?: StringNullableFilter<"MealItem"> | string | null
    isHighInProtein?: BoolFilter<"MealItem"> | boolean
    createdAt?: DateTimeFilter<"MealItem"> | Date | string
    updatedAt?: DateTimeFilter<"MealItem"> | Date | string
    syncedAt?: DateTimeNullableFilter<"MealItem"> | Date | string | null
    isDeleted?: BoolFilter<"MealItem"> | boolean
    meal?: XOR<MealScalarRelationFilter, MealWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MealItemOrderByWithAggregationInput = {
    id?: SortOrder
    mealId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    calories?: SortOrderInput | SortOrder
    protein?: SortOrderInput | SortOrder
    carbs?: SortOrderInput | SortOrder
    fat?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    isHighInProtein?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: MealItemCountOrderByAggregateInput
    _avg?: MealItemAvgOrderByAggregateInput
    _max?: MealItemMaxOrderByAggregateInput
    _min?: MealItemMinOrderByAggregateInput
    _sum?: MealItemSumOrderByAggregateInput
  }

  export type MealItemScalarWhereWithAggregatesInput = {
    AND?: MealItemScalarWhereWithAggregatesInput | MealItemScalarWhereWithAggregatesInput[]
    OR?: MealItemScalarWhereWithAggregatesInput[]
    NOT?: MealItemScalarWhereWithAggregatesInput | MealItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MealItem"> | string
    mealId?: StringWithAggregatesFilter<"MealItem"> | string
    userId?: StringWithAggregatesFilter<"MealItem"> | string
    name?: StringWithAggregatesFilter<"MealItem"> | string
    calories?: IntNullableWithAggregatesFilter<"MealItem"> | number | null
    protein?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    carbs?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    fat?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    quantity?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    unit?: StringNullableWithAggregatesFilter<"MealItem"> | string | null
    isHighInProtein?: BoolWithAggregatesFilter<"MealItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MealItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MealItem"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"MealItem"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"MealItem"> | boolean
  }

  export type ProgressLogWhereInput = {
    AND?: ProgressLogWhereInput | ProgressLogWhereInput[]
    OR?: ProgressLogWhereInput[]
    NOT?: ProgressLogWhereInput | ProgressLogWhereInput[]
    id?: StringFilter<"ProgressLog"> | string
    userId?: StringFilter<"ProgressLog"> | string
    date?: DateTimeFilter<"ProgressLog"> | Date | string
    waterL?: FloatNullableFilter<"ProgressLog"> | number | null
    sleepHrs?: FloatNullableFilter<"ProgressLog"> | number | null
    mood?: StringNullableFilter<"ProgressLog"> | string | null
    weightKg?: FloatNullableFilter<"ProgressLog"> | number | null
    steps?: IntNullableFilter<"ProgressLog"> | number | null
    activeMinutes?: IntNullableFilter<"ProgressLog"> | number | null
    createdAt?: DateTimeFilter<"ProgressLog"> | Date | string
    updatedAt?: DateTimeFilter<"ProgressLog"> | Date | string
    syncedAt?: DateTimeNullableFilter<"ProgressLog"> | Date | string | null
    isDeleted?: BoolFilter<"ProgressLog"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProgressLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    waterL?: SortOrderInput | SortOrder
    sleepHrs?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    steps?: SortOrderInput | SortOrder
    activeMinutes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProgressLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgressLogWhereInput | ProgressLogWhereInput[]
    OR?: ProgressLogWhereInput[]
    NOT?: ProgressLogWhereInput | ProgressLogWhereInput[]
    userId?: StringFilter<"ProgressLog"> | string
    date?: DateTimeFilter<"ProgressLog"> | Date | string
    waterL?: FloatNullableFilter<"ProgressLog"> | number | null
    sleepHrs?: FloatNullableFilter<"ProgressLog"> | number | null
    mood?: StringNullableFilter<"ProgressLog"> | string | null
    weightKg?: FloatNullableFilter<"ProgressLog"> | number | null
    steps?: IntNullableFilter<"ProgressLog"> | number | null
    activeMinutes?: IntNullableFilter<"ProgressLog"> | number | null
    createdAt?: DateTimeFilter<"ProgressLog"> | Date | string
    updatedAt?: DateTimeFilter<"ProgressLog"> | Date | string
    syncedAt?: DateTimeNullableFilter<"ProgressLog"> | Date | string | null
    isDeleted?: BoolFilter<"ProgressLog"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProgressLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    waterL?: SortOrderInput | SortOrder
    sleepHrs?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    steps?: SortOrderInput | SortOrder
    activeMinutes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: ProgressLogCountOrderByAggregateInput
    _avg?: ProgressLogAvgOrderByAggregateInput
    _max?: ProgressLogMaxOrderByAggregateInput
    _min?: ProgressLogMinOrderByAggregateInput
    _sum?: ProgressLogSumOrderByAggregateInput
  }

  export type ProgressLogScalarWhereWithAggregatesInput = {
    AND?: ProgressLogScalarWhereWithAggregatesInput | ProgressLogScalarWhereWithAggregatesInput[]
    OR?: ProgressLogScalarWhereWithAggregatesInput[]
    NOT?: ProgressLogScalarWhereWithAggregatesInput | ProgressLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProgressLog"> | string
    userId?: StringWithAggregatesFilter<"ProgressLog"> | string
    date?: DateTimeWithAggregatesFilter<"ProgressLog"> | Date | string
    waterL?: FloatNullableWithAggregatesFilter<"ProgressLog"> | number | null
    sleepHrs?: FloatNullableWithAggregatesFilter<"ProgressLog"> | number | null
    mood?: StringNullableWithAggregatesFilter<"ProgressLog"> | string | null
    weightKg?: FloatNullableWithAggregatesFilter<"ProgressLog"> | number | null
    steps?: IntNullableWithAggregatesFilter<"ProgressLog"> | number | null
    activeMinutes?: IntNullableWithAggregatesFilter<"ProgressLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ProgressLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProgressLog"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"ProgressLog"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"ProgressLog"> | boolean
  }

  export type WeightEntryWhereInput = {
    AND?: WeightEntryWhereInput | WeightEntryWhereInput[]
    OR?: WeightEntryWhereInput[]
    NOT?: WeightEntryWhereInput | WeightEntryWhereInput[]
    id?: StringFilter<"WeightEntry"> | string
    userId?: StringFilter<"WeightEntry"> | string
    weightKg?: FloatFilter<"WeightEntry"> | number
    date?: DateTimeFilter<"WeightEntry"> | Date | string
    photo?: StringNullableFilter<"WeightEntry"> | string | null
    notes?: StringNullableFilter<"WeightEntry"> | string | null
    bodyFatPercentage?: FloatNullableFilter<"WeightEntry"> | number | null
    muscleMassKg?: FloatNullableFilter<"WeightEntry"> | number | null
    createdAt?: DateTimeFilter<"WeightEntry"> | Date | string
    updatedAt?: DateTimeFilter<"WeightEntry"> | Date | string
    syncedAt?: DateTimeNullableFilter<"WeightEntry"> | Date | string | null
    isDeleted?: BoolFilter<"WeightEntry"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WeightEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    date?: SortOrder
    photo?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    bodyFatPercentage?: SortOrderInput | SortOrder
    muscleMassKg?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WeightEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeightEntryWhereInput | WeightEntryWhereInput[]
    OR?: WeightEntryWhereInput[]
    NOT?: WeightEntryWhereInput | WeightEntryWhereInput[]
    userId?: StringFilter<"WeightEntry"> | string
    weightKg?: FloatFilter<"WeightEntry"> | number
    date?: DateTimeFilter<"WeightEntry"> | Date | string
    photo?: StringNullableFilter<"WeightEntry"> | string | null
    notes?: StringNullableFilter<"WeightEntry"> | string | null
    bodyFatPercentage?: FloatNullableFilter<"WeightEntry"> | number | null
    muscleMassKg?: FloatNullableFilter<"WeightEntry"> | number | null
    createdAt?: DateTimeFilter<"WeightEntry"> | Date | string
    updatedAt?: DateTimeFilter<"WeightEntry"> | Date | string
    syncedAt?: DateTimeNullableFilter<"WeightEntry"> | Date | string | null
    isDeleted?: BoolFilter<"WeightEntry"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WeightEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    date?: SortOrder
    photo?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    bodyFatPercentage?: SortOrderInput | SortOrder
    muscleMassKg?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: WeightEntryCountOrderByAggregateInput
    _avg?: WeightEntryAvgOrderByAggregateInput
    _max?: WeightEntryMaxOrderByAggregateInput
    _min?: WeightEntryMinOrderByAggregateInput
    _sum?: WeightEntrySumOrderByAggregateInput
  }

  export type WeightEntryScalarWhereWithAggregatesInput = {
    AND?: WeightEntryScalarWhereWithAggregatesInput | WeightEntryScalarWhereWithAggregatesInput[]
    OR?: WeightEntryScalarWhereWithAggregatesInput[]
    NOT?: WeightEntryScalarWhereWithAggregatesInput | WeightEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeightEntry"> | string
    userId?: StringWithAggregatesFilter<"WeightEntry"> | string
    weightKg?: FloatWithAggregatesFilter<"WeightEntry"> | number
    date?: DateTimeWithAggregatesFilter<"WeightEntry"> | Date | string
    photo?: StringNullableWithAggregatesFilter<"WeightEntry"> | string | null
    notes?: StringNullableWithAggregatesFilter<"WeightEntry"> | string | null
    bodyFatPercentage?: FloatNullableWithAggregatesFilter<"WeightEntry"> | number | null
    muscleMassKg?: FloatNullableWithAggregatesFilter<"WeightEntry"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"WeightEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeightEntry"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"WeightEntry"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"WeightEntry"> | boolean
  }

  export type WaterIntakeWhereInput = {
    AND?: WaterIntakeWhereInput | WaterIntakeWhereInput[]
    OR?: WaterIntakeWhereInput[]
    NOT?: WaterIntakeWhereInput | WaterIntakeWhereInput[]
    id?: StringFilter<"WaterIntake"> | string
    userId?: StringFilter<"WaterIntake"> | string
    amountMl?: IntFilter<"WaterIntake"> | number
    date?: DateTimeFilter<"WaterIntake"> | Date | string
    time?: DateTimeFilter<"WaterIntake"> | Date | string
    createdAt?: DateTimeFilter<"WaterIntake"> | Date | string
    updatedAt?: DateTimeFilter<"WaterIntake"> | Date | string
    syncedAt?: DateTimeNullableFilter<"WaterIntake"> | Date | string | null
    isDeleted?: BoolFilter<"WaterIntake"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WaterIntakeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amountMl?: SortOrder
    date?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WaterIntakeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WaterIntakeWhereInput | WaterIntakeWhereInput[]
    OR?: WaterIntakeWhereInput[]
    NOT?: WaterIntakeWhereInput | WaterIntakeWhereInput[]
    userId?: StringFilter<"WaterIntake"> | string
    amountMl?: IntFilter<"WaterIntake"> | number
    date?: DateTimeFilter<"WaterIntake"> | Date | string
    time?: DateTimeFilter<"WaterIntake"> | Date | string
    createdAt?: DateTimeFilter<"WaterIntake"> | Date | string
    updatedAt?: DateTimeFilter<"WaterIntake"> | Date | string
    syncedAt?: DateTimeNullableFilter<"WaterIntake"> | Date | string | null
    isDeleted?: BoolFilter<"WaterIntake"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WaterIntakeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amountMl?: SortOrder
    date?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: WaterIntakeCountOrderByAggregateInput
    _avg?: WaterIntakeAvgOrderByAggregateInput
    _max?: WaterIntakeMaxOrderByAggregateInput
    _min?: WaterIntakeMinOrderByAggregateInput
    _sum?: WaterIntakeSumOrderByAggregateInput
  }

  export type WaterIntakeScalarWhereWithAggregatesInput = {
    AND?: WaterIntakeScalarWhereWithAggregatesInput | WaterIntakeScalarWhereWithAggregatesInput[]
    OR?: WaterIntakeScalarWhereWithAggregatesInput[]
    NOT?: WaterIntakeScalarWhereWithAggregatesInput | WaterIntakeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WaterIntake"> | string
    userId?: StringWithAggregatesFilter<"WaterIntake"> | string
    amountMl?: IntWithAggregatesFilter<"WaterIntake"> | number
    date?: DateTimeWithAggregatesFilter<"WaterIntake"> | Date | string
    time?: DateTimeWithAggregatesFilter<"WaterIntake"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WaterIntake"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WaterIntake"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"WaterIntake"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"WaterIntake"> | boolean
  }

  export type SleepEntryWhereInput = {
    AND?: SleepEntryWhereInput | SleepEntryWhereInput[]
    OR?: SleepEntryWhereInput[]
    NOT?: SleepEntryWhereInput | SleepEntryWhereInput[]
    id?: StringFilter<"SleepEntry"> | string
    userId?: StringFilter<"SleepEntry"> | string
    hours?: FloatFilter<"SleepEntry"> | number
    quality?: StringFilter<"SleepEntry"> | string
    date?: DateTimeFilter<"SleepEntry"> | Date | string
    bedtime?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    wakeTime?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    notes?: StringNullableFilter<"SleepEntry"> | string | null
    createdAt?: DateTimeFilter<"SleepEntry"> | Date | string
    updatedAt?: DateTimeFilter<"SleepEntry"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    isDeleted?: BoolFilter<"SleepEntry"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SleepEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    hours?: SortOrder
    quality?: SortOrder
    date?: SortOrder
    bedtime?: SortOrderInput | SortOrder
    wakeTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SleepEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SleepEntryWhereInput | SleepEntryWhereInput[]
    OR?: SleepEntryWhereInput[]
    NOT?: SleepEntryWhereInput | SleepEntryWhereInput[]
    userId?: StringFilter<"SleepEntry"> | string
    hours?: FloatFilter<"SleepEntry"> | number
    quality?: StringFilter<"SleepEntry"> | string
    date?: DateTimeFilter<"SleepEntry"> | Date | string
    bedtime?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    wakeTime?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    notes?: StringNullableFilter<"SleepEntry"> | string | null
    createdAt?: DateTimeFilter<"SleepEntry"> | Date | string
    updatedAt?: DateTimeFilter<"SleepEntry"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    isDeleted?: BoolFilter<"SleepEntry"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SleepEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    hours?: SortOrder
    quality?: SortOrder
    date?: SortOrder
    bedtime?: SortOrderInput | SortOrder
    wakeTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: SleepEntryCountOrderByAggregateInput
    _avg?: SleepEntryAvgOrderByAggregateInput
    _max?: SleepEntryMaxOrderByAggregateInput
    _min?: SleepEntryMinOrderByAggregateInput
    _sum?: SleepEntrySumOrderByAggregateInput
  }

  export type SleepEntryScalarWhereWithAggregatesInput = {
    AND?: SleepEntryScalarWhereWithAggregatesInput | SleepEntryScalarWhereWithAggregatesInput[]
    OR?: SleepEntryScalarWhereWithAggregatesInput[]
    NOT?: SleepEntryScalarWhereWithAggregatesInput | SleepEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SleepEntry"> | string
    userId?: StringWithAggregatesFilter<"SleepEntry"> | string
    hours?: FloatWithAggregatesFilter<"SleepEntry"> | number
    quality?: StringWithAggregatesFilter<"SleepEntry"> | string
    date?: DateTimeWithAggregatesFilter<"SleepEntry"> | Date | string
    bedtime?: DateTimeNullableWithAggregatesFilter<"SleepEntry"> | Date | string | null
    wakeTime?: DateTimeNullableWithAggregatesFilter<"SleepEntry"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"SleepEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SleepEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SleepEntry"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"SleepEntry"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"SleepEntry"> | boolean
  }

  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    type?: StringFilter<"Goal"> | string
    target?: FloatFilter<"Goal"> | number
    current?: FloatFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeNullableFilter<"Goal"> | Date | string | null
    isActive?: BoolFilter<"Goal"> | boolean
    notes?: StringNullableFilter<"Goal"> | string | null
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Goal"> | Date | string | null
    isDeleted?: BoolFilter<"Goal"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    target?: SortOrder
    current?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    userId?: StringFilter<"Goal"> | string
    type?: StringFilter<"Goal"> | string
    target?: FloatFilter<"Goal"> | number
    current?: FloatFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeNullableFilter<"Goal"> | Date | string | null
    isActive?: BoolFilter<"Goal"> | boolean
    notes?: StringNullableFilter<"Goal"> | string | null
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Goal"> | Date | string | null
    isDeleted?: BoolFilter<"Goal"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    target?: SortOrder
    current?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _avg?: GoalAvgOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
    _sum?: GoalSumOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Goal"> | string
    userId?: StringWithAggregatesFilter<"Goal"> | string
    type?: StringWithAggregatesFilter<"Goal"> | string
    target?: FloatWithAggregatesFilter<"Goal"> | number
    current?: FloatWithAggregatesFilter<"Goal"> | number
    unit?: StringWithAggregatesFilter<"Goal"> | string
    startDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"Goal"> | boolean
    notes?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null
    isDeleted?: BoolWithAggregatesFilter<"Goal"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthProfileCreateInput = {
    id?: string
    height?: number | null
    weight?: number | null
    age?: number | null
    gender?: string | null
    birthday?: Date | string | null
    targetWeight?: number | null
    targetCalories?: number | null
    targetWaterL?: number | null
    activityLevel?: string | null
    fitnessGoal?: string | null
    heightUnit?: string | null
    weightUnit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutHealthProfilesInput
  }

  export type HealthProfileUncheckedCreateInput = {
    id?: string
    userId: string
    height?: number | null
    weight?: number | null
    age?: number | null
    gender?: string | null
    birthday?: Date | string | null
    targetWeight?: number | null
    targetCalories?: number | null
    targetWaterL?: number | null
    activityLevel?: string | null
    fitnessGoal?: string | null
    heightUnit?: string | null
    weightUnit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type HealthProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutHealthProfilesNestedInput
  }

  export type HealthProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HealthProfileCreateManyInput = {
    id?: string
    userId: string
    height?: number | null
    weight?: number | null
    age?: number | null
    gender?: string | null
    birthday?: Date | string | null
    targetWeight?: number | null
    targetCalories?: number | null
    targetWaterL?: number | null
    activityLevel?: string | null
    fitnessGoal?: string | null
    heightUnit?: string | null
    weightUnit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type HealthProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HealthProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkoutCreateInput = {
    id?: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutWorkoutsInput
    exercises?: ExerciseCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    exercises?: ExerciseUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutWorkoutsNestedInput
    exercises?: ExerciseUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    exercises?: ExerciseUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutCreateManyInput = {
    id?: string
    userId: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExerciseCreateInput = {
    id?: string
    name: string
    sets?: number | null
    reps?: number | null
    weightKg?: number | null
    duration?: number | null
    distance?: number | null
    restTime?: number | null
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    workout: WorkoutCreateNestedOneWithoutExercisesInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: string
    workoutId: string
    name: string
    sets?: number | null
    reps?: number | null
    weightKg?: number | null
    duration?: number | null
    distance?: number | null
    restTime?: number | null
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    workout?: WorkoutUpdateOneRequiredWithoutExercisesNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExerciseCreateManyInput = {
    id?: string
    workoutId: string
    name: string
    sets?: number | null
    reps?: number | null
    weightKg?: number | null
    duration?: number | null
    distance?: number | null
    restTime?: number | null
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealCreateInput = {
    id?: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutMealsInput
    mealItems?: MealItemCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    mealItems?: MealItemUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutMealsNestedInput
    mealItems?: MealItemUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    mealItems?: MealItemUncheckedUpdateManyWithoutMealNestedInput
  }

  export type MealCreateManyInput = {
    id?: string
    userId: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemCreateInput = {
    id?: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    meal: MealCreateNestedOneWithoutMealItemsInput
    user: UserCreateNestedOneWithoutMealItemsInput
  }

  export type MealItemUncheckedCreateInput = {
    id?: string
    mealId: string
    userId: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    meal?: MealUpdateOneRequiredWithoutMealItemsNestedInput
    user?: UserUpdateOneRequiredWithoutMealItemsNestedInput
  }

  export type MealItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemCreateManyInput = {
    id?: string
    mealId: string
    userId: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressLogCreateInput = {
    id?: string
    date: Date | string
    waterL?: number | null
    sleepHrs?: number | null
    mood?: string | null
    weightKg?: number | null
    steps?: number | null
    activeMinutes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutProgressLogsInput
  }

  export type ProgressLogUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    waterL?: number | null
    sleepHrs?: number | null
    mood?: string | null
    weightKg?: number | null
    steps?: number | null
    activeMinutes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ProgressLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutProgressLogsNestedInput
  }

  export type ProgressLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressLogCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    waterL?: number | null
    sleepHrs?: number | null
    mood?: string | null
    weightKg?: number | null
    steps?: number | null
    activeMinutes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ProgressLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WeightEntryCreateInput = {
    id?: string
    weightKg: number
    date: Date | string
    photo?: string | null
    notes?: string | null
    bodyFatPercentage?: number | null
    muscleMassKg?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutWeightEntriesInput
  }

  export type WeightEntryUncheckedCreateInput = {
    id?: string
    userId: string
    weightKg: number
    date: Date | string
    photo?: string | null
    notes?: string | null
    bodyFatPercentage?: number | null
    muscleMassKg?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WeightEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutWeightEntriesNestedInput
  }

  export type WeightEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WeightEntryCreateManyInput = {
    id?: string
    userId: string
    weightKg: number
    date: Date | string
    photo?: string | null
    notes?: string | null
    bodyFatPercentage?: number | null
    muscleMassKg?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WeightEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WeightEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WaterIntakeCreateInput = {
    id?: string
    amountMl: number
    date: Date | string
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutWaterIntakeInput
  }

  export type WaterIntakeUncheckedCreateInput = {
    id?: string
    userId: string
    amountMl: number
    date: Date | string
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WaterIntakeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutWaterIntakeNestedInput
  }

  export type WaterIntakeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WaterIntakeCreateManyInput = {
    id?: string
    userId: string
    amountMl: number
    date: Date | string
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WaterIntakeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WaterIntakeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SleepEntryCreateInput = {
    id?: string
    hours: number
    quality: string
    date: Date | string
    bedtime?: Date | string | null
    wakeTime?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutSleepEntriesInput
  }

  export type SleepEntryUncheckedCreateInput = {
    id?: string
    userId: string
    hours: number
    quality: string
    date: Date | string
    bedtime?: Date | string | null
    wakeTime?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type SleepEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutSleepEntriesNestedInput
  }

  export type SleepEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SleepEntryCreateManyInput = {
    id?: string
    userId: string
    hours: number
    quality: string
    date: Date | string
    bedtime?: Date | string | null
    wakeTime?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type SleepEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SleepEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoalCreateInput = {
    id?: string
    type: string
    target: number
    current?: number
    unit: string
    startDate: Date | string
    endDate?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutGoalsInput
  }

  export type GoalUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    target: number
    current?: number
    unit: string
    startDate: Date | string
    endDate?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type GoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
  }

  export type GoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoalCreateManyInput = {
    id?: string
    userId: string
    type: string
    target: number
    current?: number
    unit: string
    startDate: Date | string
    endDate?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type GoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type HealthProfileListRelationFilter = {
    every?: HealthProfileWhereInput
    some?: HealthProfileWhereInput
    none?: HealthProfileWhereInput
  }

  export type WorkoutListRelationFilter = {
    every?: WorkoutWhereInput
    some?: WorkoutWhereInput
    none?: WorkoutWhereInput
  }

  export type MealListRelationFilter = {
    every?: MealWhereInput
    some?: MealWhereInput
    none?: MealWhereInput
  }

  export type MealItemListRelationFilter = {
    every?: MealItemWhereInput
    some?: MealItemWhereInput
    none?: MealItemWhereInput
  }

  export type ProgressLogListRelationFilter = {
    every?: ProgressLogWhereInput
    some?: ProgressLogWhereInput
    none?: ProgressLogWhereInput
  }

  export type WeightEntryListRelationFilter = {
    every?: WeightEntryWhereInput
    some?: WeightEntryWhereInput
    none?: WeightEntryWhereInput
  }

  export type WaterIntakeListRelationFilter = {
    every?: WaterIntakeWhereInput
    some?: WaterIntakeWhereInput
    none?: WaterIntakeWhereInput
  }

  export type SleepEntryListRelationFilter = {
    every?: SleepEntryWhereInput
    some?: SleepEntryWhereInput
    none?: SleepEntryWhereInput
  }

  export type GoalListRelationFilter = {
    every?: GoalWhereInput
    some?: GoalWhereInput
    none?: GoalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HealthProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MealItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgressLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeightEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WaterIntakeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SleepEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type HealthProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthday?: SortOrder
    targetWeight?: SortOrder
    targetCalories?: SortOrder
    targetWaterL?: SortOrder
    activityLevel?: SortOrder
    fitnessGoal?: SortOrder
    heightUnit?: SortOrder
    weightUnit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type HealthProfileAvgOrderByAggregateInput = {
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    targetWeight?: SortOrder
    targetCalories?: SortOrder
    targetWaterL?: SortOrder
  }

  export type HealthProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthday?: SortOrder
    targetWeight?: SortOrder
    targetCalories?: SortOrder
    targetWaterL?: SortOrder
    activityLevel?: SortOrder
    fitnessGoal?: SortOrder
    heightUnit?: SortOrder
    weightUnit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type HealthProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthday?: SortOrder
    targetWeight?: SortOrder
    targetCalories?: SortOrder
    targetWaterL?: SortOrder
    activityLevel?: SortOrder
    fitnessGoal?: SortOrder
    heightUnit?: SortOrder
    weightUnit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type HealthProfileSumOrderByAggregateInput = {
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    targetWeight?: SortOrder
    targetCalories?: SortOrder
    targetWaterL?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput
    some?: ExerciseWhereInput
    none?: ExerciseWhereInput
  }

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkoutCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    durationMin?: SortOrder
    calories?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    totalTime?: SortOrder
    restTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WorkoutAvgOrderByAggregateInput = {
    durationMin?: SortOrder
    calories?: SortOrder
    totalTime?: SortOrder
    restTime?: SortOrder
  }

  export type WorkoutMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    durationMin?: SortOrder
    calories?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    totalTime?: SortOrder
    restTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WorkoutMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    durationMin?: SortOrder
    calories?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    isCompleted?: SortOrder
    totalTime?: SortOrder
    restTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WorkoutSumOrderByAggregateInput = {
    durationMin?: SortOrder
    calories?: SortOrder
    totalTime?: SortOrder
    restTime?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type WorkoutScalarRelationFilter = {
    is?: WorkoutWhereInput
    isNot?: WorkoutWhereInput
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    workoutId?: SortOrder
    name?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightKg?: SortOrder
    duration?: SortOrder
    distance?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ExerciseAvgOrderByAggregateInput = {
    sets?: SortOrder
    reps?: SortOrder
    weightKg?: SortOrder
    duration?: SortOrder
    distance?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    workoutId?: SortOrder
    name?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightKg?: SortOrder
    duration?: SortOrder
    distance?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    workoutId?: SortOrder
    name?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightKg?: SortOrder
    duration?: SortOrder
    distance?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ExerciseSumOrderByAggregateInput = {
    sets?: SortOrder
    reps?: SortOrder
    weightKg?: SortOrder
    duration?: SortOrder
    distance?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MealCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    mealType?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type MealAvgOrderByAggregateInput = {
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
  }

  export type MealMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    mealType?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type MealMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    mealType?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type MealSumOrderByAggregateInput = {
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
  }

  export type MealScalarRelationFilter = {
    is?: MealWhereInput
    isNot?: MealWhereInput
  }

  export type MealItemCountOrderByAggregateInput = {
    id?: SortOrder
    mealId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    isHighInProtein?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type MealItemAvgOrderByAggregateInput = {
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    quantity?: SortOrder
  }

  export type MealItemMaxOrderByAggregateInput = {
    id?: SortOrder
    mealId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    isHighInProtein?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type MealItemMinOrderByAggregateInput = {
    id?: SortOrder
    mealId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    isHighInProtein?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type MealItemSumOrderByAggregateInput = {
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    quantity?: SortOrder
  }

  export type ProgressLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    waterL?: SortOrder
    sleepHrs?: SortOrder
    mood?: SortOrder
    weightKg?: SortOrder
    steps?: SortOrder
    activeMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ProgressLogAvgOrderByAggregateInput = {
    waterL?: SortOrder
    sleepHrs?: SortOrder
    weightKg?: SortOrder
    steps?: SortOrder
    activeMinutes?: SortOrder
  }

  export type ProgressLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    waterL?: SortOrder
    sleepHrs?: SortOrder
    mood?: SortOrder
    weightKg?: SortOrder
    steps?: SortOrder
    activeMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ProgressLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    waterL?: SortOrder
    sleepHrs?: SortOrder
    mood?: SortOrder
    weightKg?: SortOrder
    steps?: SortOrder
    activeMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type ProgressLogSumOrderByAggregateInput = {
    waterL?: SortOrder
    sleepHrs?: SortOrder
    weightKg?: SortOrder
    steps?: SortOrder
    activeMinutes?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WeightEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    date?: SortOrder
    photo?: SortOrder
    notes?: SortOrder
    bodyFatPercentage?: SortOrder
    muscleMassKg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WeightEntryAvgOrderByAggregateInput = {
    weightKg?: SortOrder
    bodyFatPercentage?: SortOrder
    muscleMassKg?: SortOrder
  }

  export type WeightEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    date?: SortOrder
    photo?: SortOrder
    notes?: SortOrder
    bodyFatPercentage?: SortOrder
    muscleMassKg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WeightEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    date?: SortOrder
    photo?: SortOrder
    notes?: SortOrder
    bodyFatPercentage?: SortOrder
    muscleMassKg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WeightEntrySumOrderByAggregateInput = {
    weightKg?: SortOrder
    bodyFatPercentage?: SortOrder
    muscleMassKg?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type WaterIntakeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amountMl?: SortOrder
    date?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WaterIntakeAvgOrderByAggregateInput = {
    amountMl?: SortOrder
  }

  export type WaterIntakeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amountMl?: SortOrder
    date?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WaterIntakeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amountMl?: SortOrder
    date?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type WaterIntakeSumOrderByAggregateInput = {
    amountMl?: SortOrder
  }

  export type SleepEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hours?: SortOrder
    quality?: SortOrder
    date?: SortOrder
    bedtime?: SortOrder
    wakeTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type SleepEntryAvgOrderByAggregateInput = {
    hours?: SortOrder
  }

  export type SleepEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hours?: SortOrder
    quality?: SortOrder
    date?: SortOrder
    bedtime?: SortOrder
    wakeTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type SleepEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hours?: SortOrder
    quality?: SortOrder
    date?: SortOrder
    bedtime?: SortOrder
    wakeTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type SleepEntrySumOrderByAggregateInput = {
    hours?: SortOrder
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    target?: SortOrder
    current?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type GoalAvgOrderByAggregateInput = {
    target?: SortOrder
    current?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    target?: SortOrder
    current?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    target?: SortOrder
    current?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
    isDeleted?: SortOrder
  }

  export type GoalSumOrderByAggregateInput = {
    target?: SortOrder
    current?: SortOrder
  }

  export type HealthProfileCreateNestedManyWithoutUserInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput> | HealthProfileCreateWithoutUserInput[] | HealthProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput | HealthProfileCreateOrConnectWithoutUserInput[]
    createMany?: HealthProfileCreateManyUserInputEnvelope
    connect?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
  }

  export type WorkoutCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput> | WorkoutCreateWithoutUserInput[] | WorkoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutUserInput | WorkoutCreateOrConnectWithoutUserInput[]
    createMany?: WorkoutCreateManyUserInputEnvelope
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
  }

  export type MealCreateNestedManyWithoutUserInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
  }

  export type MealItemCreateNestedManyWithoutUserInput = {
    create?: XOR<MealItemCreateWithoutUserInput, MealItemUncheckedCreateWithoutUserInput> | MealItemCreateWithoutUserInput[] | MealItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutUserInput | MealItemCreateOrConnectWithoutUserInput[]
    createMany?: MealItemCreateManyUserInputEnvelope
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
  }

  export type ProgressLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgressLogCreateWithoutUserInput, ProgressLogUncheckedCreateWithoutUserInput> | ProgressLogCreateWithoutUserInput[] | ProgressLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressLogCreateOrConnectWithoutUserInput | ProgressLogCreateOrConnectWithoutUserInput[]
    createMany?: ProgressLogCreateManyUserInputEnvelope
    connect?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
  }

  export type WeightEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<WeightEntryCreateWithoutUserInput, WeightEntryUncheckedCreateWithoutUserInput> | WeightEntryCreateWithoutUserInput[] | WeightEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightEntryCreateOrConnectWithoutUserInput | WeightEntryCreateOrConnectWithoutUserInput[]
    createMany?: WeightEntryCreateManyUserInputEnvelope
    connect?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
  }

  export type WaterIntakeCreateNestedManyWithoutUserInput = {
    create?: XOR<WaterIntakeCreateWithoutUserInput, WaterIntakeUncheckedCreateWithoutUserInput> | WaterIntakeCreateWithoutUserInput[] | WaterIntakeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterIntakeCreateOrConnectWithoutUserInput | WaterIntakeCreateOrConnectWithoutUserInput[]
    createMany?: WaterIntakeCreateManyUserInputEnvelope
    connect?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
  }

  export type SleepEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<SleepEntryCreateWithoutUserInput, SleepEntryUncheckedCreateWithoutUserInput> | SleepEntryCreateWithoutUserInput[] | SleepEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SleepEntryCreateOrConnectWithoutUserInput | SleepEntryCreateOrConnectWithoutUserInput[]
    createMany?: SleepEntryCreateManyUserInputEnvelope
    connect?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
  }

  export type GoalCreateNestedManyWithoutUserInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
  }

  export type HealthProfileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput> | HealthProfileCreateWithoutUserInput[] | HealthProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput | HealthProfileCreateOrConnectWithoutUserInput[]
    createMany?: HealthProfileCreateManyUserInputEnvelope
    connect?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
  }

  export type WorkoutUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput> | WorkoutCreateWithoutUserInput[] | WorkoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutUserInput | WorkoutCreateOrConnectWithoutUserInput[]
    createMany?: WorkoutCreateManyUserInputEnvelope
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
  }

  export type MealUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
  }

  export type MealItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MealItemCreateWithoutUserInput, MealItemUncheckedCreateWithoutUserInput> | MealItemCreateWithoutUserInput[] | MealItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutUserInput | MealItemCreateOrConnectWithoutUserInput[]
    createMany?: MealItemCreateManyUserInputEnvelope
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
  }

  export type ProgressLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgressLogCreateWithoutUserInput, ProgressLogUncheckedCreateWithoutUserInput> | ProgressLogCreateWithoutUserInput[] | ProgressLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressLogCreateOrConnectWithoutUserInput | ProgressLogCreateOrConnectWithoutUserInput[]
    createMany?: ProgressLogCreateManyUserInputEnvelope
    connect?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
  }

  export type WeightEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WeightEntryCreateWithoutUserInput, WeightEntryUncheckedCreateWithoutUserInput> | WeightEntryCreateWithoutUserInput[] | WeightEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightEntryCreateOrConnectWithoutUserInput | WeightEntryCreateOrConnectWithoutUserInput[]
    createMany?: WeightEntryCreateManyUserInputEnvelope
    connect?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
  }

  export type WaterIntakeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WaterIntakeCreateWithoutUserInput, WaterIntakeUncheckedCreateWithoutUserInput> | WaterIntakeCreateWithoutUserInput[] | WaterIntakeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterIntakeCreateOrConnectWithoutUserInput | WaterIntakeCreateOrConnectWithoutUserInput[]
    createMany?: WaterIntakeCreateManyUserInputEnvelope
    connect?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
  }

  export type SleepEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SleepEntryCreateWithoutUserInput, SleepEntryUncheckedCreateWithoutUserInput> | SleepEntryCreateWithoutUserInput[] | SleepEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SleepEntryCreateOrConnectWithoutUserInput | SleepEntryCreateOrConnectWithoutUserInput[]
    createMany?: SleepEntryCreateManyUserInputEnvelope
    connect?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
  }

  export type GoalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type HealthProfileUpdateManyWithoutUserNestedInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput> | HealthProfileCreateWithoutUserInput[] | HealthProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput | HealthProfileCreateOrConnectWithoutUserInput[]
    upsert?: HealthProfileUpsertWithWhereUniqueWithoutUserInput | HealthProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HealthProfileCreateManyUserInputEnvelope
    set?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    disconnect?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    delete?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    connect?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    update?: HealthProfileUpdateWithWhereUniqueWithoutUserInput | HealthProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HealthProfileUpdateManyWithWhereWithoutUserInput | HealthProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HealthProfileScalarWhereInput | HealthProfileScalarWhereInput[]
  }

  export type WorkoutUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput> | WorkoutCreateWithoutUserInput[] | WorkoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutUserInput | WorkoutCreateOrConnectWithoutUserInput[]
    upsert?: WorkoutUpsertWithWhereUniqueWithoutUserInput | WorkoutUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkoutCreateManyUserInputEnvelope
    set?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    disconnect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    delete?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    update?: WorkoutUpdateWithWhereUniqueWithoutUserInput | WorkoutUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkoutUpdateManyWithWhereWithoutUserInput | WorkoutUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
  }

  export type MealUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    upsert?: MealUpsertWithWhereUniqueWithoutUserInput | MealUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    set?: MealWhereUniqueInput | MealWhereUniqueInput[]
    disconnect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    delete?: MealWhereUniqueInput | MealWhereUniqueInput[]
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    update?: MealUpdateWithWhereUniqueWithoutUserInput | MealUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealUpdateManyWithWhereWithoutUserInput | MealUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealScalarWhereInput | MealScalarWhereInput[]
  }

  export type MealItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealItemCreateWithoutUserInput, MealItemUncheckedCreateWithoutUserInput> | MealItemCreateWithoutUserInput[] | MealItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutUserInput | MealItemCreateOrConnectWithoutUserInput[]
    upsert?: MealItemUpsertWithWhereUniqueWithoutUserInput | MealItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealItemCreateManyUserInputEnvelope
    set?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    disconnect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    delete?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    update?: MealItemUpdateWithWhereUniqueWithoutUserInput | MealItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealItemUpdateManyWithWhereWithoutUserInput | MealItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
  }

  export type ProgressLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgressLogCreateWithoutUserInput, ProgressLogUncheckedCreateWithoutUserInput> | ProgressLogCreateWithoutUserInput[] | ProgressLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressLogCreateOrConnectWithoutUserInput | ProgressLogCreateOrConnectWithoutUserInput[]
    upsert?: ProgressLogUpsertWithWhereUniqueWithoutUserInput | ProgressLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgressLogCreateManyUserInputEnvelope
    set?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    disconnect?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    delete?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    connect?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    update?: ProgressLogUpdateWithWhereUniqueWithoutUserInput | ProgressLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgressLogUpdateManyWithWhereWithoutUserInput | ProgressLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgressLogScalarWhereInput | ProgressLogScalarWhereInput[]
  }

  export type WeightEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeightEntryCreateWithoutUserInput, WeightEntryUncheckedCreateWithoutUserInput> | WeightEntryCreateWithoutUserInput[] | WeightEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightEntryCreateOrConnectWithoutUserInput | WeightEntryCreateOrConnectWithoutUserInput[]
    upsert?: WeightEntryUpsertWithWhereUniqueWithoutUserInput | WeightEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeightEntryCreateManyUserInputEnvelope
    set?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    disconnect?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    delete?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    connect?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    update?: WeightEntryUpdateWithWhereUniqueWithoutUserInput | WeightEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeightEntryUpdateManyWithWhereWithoutUserInput | WeightEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeightEntryScalarWhereInput | WeightEntryScalarWhereInput[]
  }

  export type WaterIntakeUpdateManyWithoutUserNestedInput = {
    create?: XOR<WaterIntakeCreateWithoutUserInput, WaterIntakeUncheckedCreateWithoutUserInput> | WaterIntakeCreateWithoutUserInput[] | WaterIntakeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterIntakeCreateOrConnectWithoutUserInput | WaterIntakeCreateOrConnectWithoutUserInput[]
    upsert?: WaterIntakeUpsertWithWhereUniqueWithoutUserInput | WaterIntakeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WaterIntakeCreateManyUserInputEnvelope
    set?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    disconnect?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    delete?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    connect?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    update?: WaterIntakeUpdateWithWhereUniqueWithoutUserInput | WaterIntakeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WaterIntakeUpdateManyWithWhereWithoutUserInput | WaterIntakeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WaterIntakeScalarWhereInput | WaterIntakeScalarWhereInput[]
  }

  export type SleepEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<SleepEntryCreateWithoutUserInput, SleepEntryUncheckedCreateWithoutUserInput> | SleepEntryCreateWithoutUserInput[] | SleepEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SleepEntryCreateOrConnectWithoutUserInput | SleepEntryCreateOrConnectWithoutUserInput[]
    upsert?: SleepEntryUpsertWithWhereUniqueWithoutUserInput | SleepEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SleepEntryCreateManyUserInputEnvelope
    set?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    disconnect?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    delete?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    connect?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    update?: SleepEntryUpdateWithWhereUniqueWithoutUserInput | SleepEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SleepEntryUpdateManyWithWhereWithoutUserInput | SleepEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SleepEntryScalarWhereInput | SleepEntryScalarWhereInput[]
  }

  export type GoalUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    upsert?: GoalUpsertWithWhereUniqueWithoutUserInput | GoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    set?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    disconnect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    delete?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    update?: GoalUpdateWithWhereUniqueWithoutUserInput | GoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoalUpdateManyWithWhereWithoutUserInput | GoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoalScalarWhereInput | GoalScalarWhereInput[]
  }

  export type HealthProfileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput> | HealthProfileCreateWithoutUserInput[] | HealthProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput | HealthProfileCreateOrConnectWithoutUserInput[]
    upsert?: HealthProfileUpsertWithWhereUniqueWithoutUserInput | HealthProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HealthProfileCreateManyUserInputEnvelope
    set?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    disconnect?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    delete?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    connect?: HealthProfileWhereUniqueInput | HealthProfileWhereUniqueInput[]
    update?: HealthProfileUpdateWithWhereUniqueWithoutUserInput | HealthProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HealthProfileUpdateManyWithWhereWithoutUserInput | HealthProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HealthProfileScalarWhereInput | HealthProfileScalarWhereInput[]
  }

  export type WorkoutUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput> | WorkoutCreateWithoutUserInput[] | WorkoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutUserInput | WorkoutCreateOrConnectWithoutUserInput[]
    upsert?: WorkoutUpsertWithWhereUniqueWithoutUserInput | WorkoutUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkoutCreateManyUserInputEnvelope
    set?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    disconnect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    delete?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    update?: WorkoutUpdateWithWhereUniqueWithoutUserInput | WorkoutUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkoutUpdateManyWithWhereWithoutUserInput | WorkoutUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
  }

  export type MealUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    upsert?: MealUpsertWithWhereUniqueWithoutUserInput | MealUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    set?: MealWhereUniqueInput | MealWhereUniqueInput[]
    disconnect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    delete?: MealWhereUniqueInput | MealWhereUniqueInput[]
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    update?: MealUpdateWithWhereUniqueWithoutUserInput | MealUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealUpdateManyWithWhereWithoutUserInput | MealUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealScalarWhereInput | MealScalarWhereInput[]
  }

  export type MealItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealItemCreateWithoutUserInput, MealItemUncheckedCreateWithoutUserInput> | MealItemCreateWithoutUserInput[] | MealItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutUserInput | MealItemCreateOrConnectWithoutUserInput[]
    upsert?: MealItemUpsertWithWhereUniqueWithoutUserInput | MealItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealItemCreateManyUserInputEnvelope
    set?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    disconnect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    delete?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    update?: MealItemUpdateWithWhereUniqueWithoutUserInput | MealItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealItemUpdateManyWithWhereWithoutUserInput | MealItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
  }

  export type ProgressLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgressLogCreateWithoutUserInput, ProgressLogUncheckedCreateWithoutUserInput> | ProgressLogCreateWithoutUserInput[] | ProgressLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressLogCreateOrConnectWithoutUserInput | ProgressLogCreateOrConnectWithoutUserInput[]
    upsert?: ProgressLogUpsertWithWhereUniqueWithoutUserInput | ProgressLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgressLogCreateManyUserInputEnvelope
    set?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    disconnect?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    delete?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    connect?: ProgressLogWhereUniqueInput | ProgressLogWhereUniqueInput[]
    update?: ProgressLogUpdateWithWhereUniqueWithoutUserInput | ProgressLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgressLogUpdateManyWithWhereWithoutUserInput | ProgressLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgressLogScalarWhereInput | ProgressLogScalarWhereInput[]
  }

  export type WeightEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeightEntryCreateWithoutUserInput, WeightEntryUncheckedCreateWithoutUserInput> | WeightEntryCreateWithoutUserInput[] | WeightEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightEntryCreateOrConnectWithoutUserInput | WeightEntryCreateOrConnectWithoutUserInput[]
    upsert?: WeightEntryUpsertWithWhereUniqueWithoutUserInput | WeightEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeightEntryCreateManyUserInputEnvelope
    set?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    disconnect?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    delete?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    connect?: WeightEntryWhereUniqueInput | WeightEntryWhereUniqueInput[]
    update?: WeightEntryUpdateWithWhereUniqueWithoutUserInput | WeightEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeightEntryUpdateManyWithWhereWithoutUserInput | WeightEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeightEntryScalarWhereInput | WeightEntryScalarWhereInput[]
  }

  export type WaterIntakeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WaterIntakeCreateWithoutUserInput, WaterIntakeUncheckedCreateWithoutUserInput> | WaterIntakeCreateWithoutUserInput[] | WaterIntakeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterIntakeCreateOrConnectWithoutUserInput | WaterIntakeCreateOrConnectWithoutUserInput[]
    upsert?: WaterIntakeUpsertWithWhereUniqueWithoutUserInput | WaterIntakeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WaterIntakeCreateManyUserInputEnvelope
    set?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    disconnect?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    delete?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    connect?: WaterIntakeWhereUniqueInput | WaterIntakeWhereUniqueInput[]
    update?: WaterIntakeUpdateWithWhereUniqueWithoutUserInput | WaterIntakeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WaterIntakeUpdateManyWithWhereWithoutUserInput | WaterIntakeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WaterIntakeScalarWhereInput | WaterIntakeScalarWhereInput[]
  }

  export type SleepEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SleepEntryCreateWithoutUserInput, SleepEntryUncheckedCreateWithoutUserInput> | SleepEntryCreateWithoutUserInput[] | SleepEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SleepEntryCreateOrConnectWithoutUserInput | SleepEntryCreateOrConnectWithoutUserInput[]
    upsert?: SleepEntryUpsertWithWhereUniqueWithoutUserInput | SleepEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SleepEntryCreateManyUserInputEnvelope
    set?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    disconnect?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    delete?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    connect?: SleepEntryWhereUniqueInput | SleepEntryWhereUniqueInput[]
    update?: SleepEntryUpdateWithWhereUniqueWithoutUserInput | SleepEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SleepEntryUpdateManyWithWhereWithoutUserInput | SleepEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SleepEntryScalarWhereInput | SleepEntryScalarWhereInput[]
  }

  export type GoalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    upsert?: GoalUpsertWithWhereUniqueWithoutUserInput | GoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    set?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    disconnect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    delete?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    update?: GoalUpdateWithWhereUniqueWithoutUserInput | GoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoalUpdateManyWithWhereWithoutUserInput | GoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoalScalarWhereInput | GoalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutHealthProfilesInput = {
    create?: XOR<UserCreateWithoutHealthProfilesInput, UserUncheckedCreateWithoutHealthProfilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHealthProfilesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutHealthProfilesNestedInput = {
    create?: XOR<UserCreateWithoutHealthProfilesInput, UserUncheckedCreateWithoutHealthProfilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHealthProfilesInput
    upsert?: UserUpsertWithoutHealthProfilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHealthProfilesInput, UserUpdateWithoutHealthProfilesInput>, UserUncheckedUpdateWithoutHealthProfilesInput>
  }

  export type UserCreateNestedOneWithoutWorkoutsInput = {
    create?: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutsInput
    connect?: UserWhereUniqueInput
  }

  export type ExerciseCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<ExerciseCreateWithoutWorkoutInput, ExerciseUncheckedCreateWithoutWorkoutInput> | ExerciseCreateWithoutWorkoutInput[] | ExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutInput | ExerciseCreateOrConnectWithoutWorkoutInput[]
    createMany?: ExerciseCreateManyWorkoutInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<ExerciseCreateWithoutWorkoutInput, ExerciseUncheckedCreateWithoutWorkoutInput> | ExerciseCreateWithoutWorkoutInput[] | ExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutInput | ExerciseCreateOrConnectWithoutWorkoutInput[]
    createMany?: ExerciseCreateManyWorkoutInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutWorkoutsNestedInput = {
    create?: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutsInput
    upsert?: UserUpsertWithoutWorkoutsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkoutsInput, UserUpdateWithoutWorkoutsInput>, UserUncheckedUpdateWithoutWorkoutsInput>
  }

  export type ExerciseUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<ExerciseCreateWithoutWorkoutInput, ExerciseUncheckedCreateWithoutWorkoutInput> | ExerciseCreateWithoutWorkoutInput[] | ExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutInput | ExerciseCreateOrConnectWithoutWorkoutInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutWorkoutInput | ExerciseUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: ExerciseCreateManyWorkoutInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutWorkoutInput | ExerciseUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutWorkoutInput | ExerciseUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<ExerciseCreateWithoutWorkoutInput, ExerciseUncheckedCreateWithoutWorkoutInput> | ExerciseCreateWithoutWorkoutInput[] | ExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutInput | ExerciseCreateOrConnectWithoutWorkoutInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutWorkoutInput | ExerciseUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: ExerciseCreateManyWorkoutInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutWorkoutInput | ExerciseUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutWorkoutInput | ExerciseUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type WorkoutCreateNestedOneWithoutExercisesInput = {
    create?: XOR<WorkoutCreateWithoutExercisesInput, WorkoutUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutExercisesInput
    connect?: WorkoutWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkoutUpdateOneRequiredWithoutExercisesNestedInput = {
    create?: XOR<WorkoutCreateWithoutExercisesInput, WorkoutUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutExercisesInput
    upsert?: WorkoutUpsertWithoutExercisesInput
    connect?: WorkoutWhereUniqueInput
    update?: XOR<XOR<WorkoutUpdateToOneWithWhereWithoutExercisesInput, WorkoutUpdateWithoutExercisesInput>, WorkoutUncheckedUpdateWithoutExercisesInput>
  }

  export type UserCreateNestedOneWithoutMealsInput = {
    create?: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealsInput
    connect?: UserWhereUniqueInput
  }

  export type MealItemCreateNestedManyWithoutMealInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
  }

  export type MealItemUncheckedCreateNestedManyWithoutMealInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMealsNestedInput = {
    create?: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealsInput
    upsert?: UserUpsertWithoutMealsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMealsInput, UserUpdateWithoutMealsInput>, UserUncheckedUpdateWithoutMealsInput>
  }

  export type MealItemUpdateManyWithoutMealNestedInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    upsert?: MealItemUpsertWithWhereUniqueWithoutMealInput | MealItemUpsertWithWhereUniqueWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    set?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    disconnect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    delete?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    update?: MealItemUpdateWithWhereUniqueWithoutMealInput | MealItemUpdateWithWhereUniqueWithoutMealInput[]
    updateMany?: MealItemUpdateManyWithWhereWithoutMealInput | MealItemUpdateManyWithWhereWithoutMealInput[]
    deleteMany?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
  }

  export type MealItemUncheckedUpdateManyWithoutMealNestedInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    upsert?: MealItemUpsertWithWhereUniqueWithoutMealInput | MealItemUpsertWithWhereUniqueWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    set?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    disconnect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    delete?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    update?: MealItemUpdateWithWhereUniqueWithoutMealInput | MealItemUpdateWithWhereUniqueWithoutMealInput[]
    updateMany?: MealItemUpdateManyWithWhereWithoutMealInput | MealItemUpdateManyWithWhereWithoutMealInput[]
    deleteMany?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
  }

  export type MealCreateNestedOneWithoutMealItemsInput = {
    create?: XOR<MealCreateWithoutMealItemsInput, MealUncheckedCreateWithoutMealItemsInput>
    connectOrCreate?: MealCreateOrConnectWithoutMealItemsInput
    connect?: MealWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMealItemsInput = {
    create?: XOR<UserCreateWithoutMealItemsInput, UserUncheckedCreateWithoutMealItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealItemsInput
    connect?: UserWhereUniqueInput
  }

  export type MealUpdateOneRequiredWithoutMealItemsNestedInput = {
    create?: XOR<MealCreateWithoutMealItemsInput, MealUncheckedCreateWithoutMealItemsInput>
    connectOrCreate?: MealCreateOrConnectWithoutMealItemsInput
    upsert?: MealUpsertWithoutMealItemsInput
    connect?: MealWhereUniqueInput
    update?: XOR<XOR<MealUpdateToOneWithWhereWithoutMealItemsInput, MealUpdateWithoutMealItemsInput>, MealUncheckedUpdateWithoutMealItemsInput>
  }

  export type UserUpdateOneRequiredWithoutMealItemsNestedInput = {
    create?: XOR<UserCreateWithoutMealItemsInput, UserUncheckedCreateWithoutMealItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealItemsInput
    upsert?: UserUpsertWithoutMealItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMealItemsInput, UserUpdateWithoutMealItemsInput>, UserUncheckedUpdateWithoutMealItemsInput>
  }

  export type UserCreateNestedOneWithoutProgressLogsInput = {
    create?: XOR<UserCreateWithoutProgressLogsInput, UserUncheckedCreateWithoutProgressLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProgressLogsNestedInput = {
    create?: XOR<UserCreateWithoutProgressLogsInput, UserUncheckedCreateWithoutProgressLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressLogsInput
    upsert?: UserUpsertWithoutProgressLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgressLogsInput, UserUpdateWithoutProgressLogsInput>, UserUncheckedUpdateWithoutProgressLogsInput>
  }

  export type UserCreateNestedOneWithoutWeightEntriesInput = {
    create?: XOR<UserCreateWithoutWeightEntriesInput, UserUncheckedCreateWithoutWeightEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWeightEntriesNestedInput = {
    create?: XOR<UserCreateWithoutWeightEntriesInput, UserUncheckedCreateWithoutWeightEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightEntriesInput
    upsert?: UserUpsertWithoutWeightEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWeightEntriesInput, UserUpdateWithoutWeightEntriesInput>, UserUncheckedUpdateWithoutWeightEntriesInput>
  }

  export type UserCreateNestedOneWithoutWaterIntakeInput = {
    create?: XOR<UserCreateWithoutWaterIntakeInput, UserUncheckedCreateWithoutWaterIntakeInput>
    connectOrCreate?: UserCreateOrConnectWithoutWaterIntakeInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWaterIntakeNestedInput = {
    create?: XOR<UserCreateWithoutWaterIntakeInput, UserUncheckedCreateWithoutWaterIntakeInput>
    connectOrCreate?: UserCreateOrConnectWithoutWaterIntakeInput
    upsert?: UserUpsertWithoutWaterIntakeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWaterIntakeInput, UserUpdateWithoutWaterIntakeInput>, UserUncheckedUpdateWithoutWaterIntakeInput>
  }

  export type UserCreateNestedOneWithoutSleepEntriesInput = {
    create?: XOR<UserCreateWithoutSleepEntriesInput, UserUncheckedCreateWithoutSleepEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSleepEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSleepEntriesNestedInput = {
    create?: XOR<UserCreateWithoutSleepEntriesInput, UserUncheckedCreateWithoutSleepEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSleepEntriesInput
    upsert?: UserUpsertWithoutSleepEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSleepEntriesInput, UserUpdateWithoutSleepEntriesInput>, UserUncheckedUpdateWithoutSleepEntriesInput>
  }

  export type UserCreateNestedOneWithoutGoalsInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGoalsNestedInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    upsert?: UserUpsertWithoutGoalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGoalsInput, UserUpdateWithoutGoalsInput>, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type HealthProfileCreateWithoutUserInput = {
    id?: string
    height?: number | null
    weight?: number | null
    age?: number | null
    gender?: string | null
    birthday?: Date | string | null
    targetWeight?: number | null
    targetCalories?: number | null
    targetWaterL?: number | null
    activityLevel?: string | null
    fitnessGoal?: string | null
    heightUnit?: string | null
    weightUnit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type HealthProfileUncheckedCreateWithoutUserInput = {
    id?: string
    height?: number | null
    weight?: number | null
    age?: number | null
    gender?: string | null
    birthday?: Date | string | null
    targetWeight?: number | null
    targetCalories?: number | null
    targetWaterL?: number | null
    activityLevel?: string | null
    fitnessGoal?: string | null
    heightUnit?: string | null
    weightUnit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type HealthProfileCreateOrConnectWithoutUserInput = {
    where: HealthProfileWhereUniqueInput
    create: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
  }

  export type HealthProfileCreateManyUserInputEnvelope = {
    data: HealthProfileCreateManyUserInput | HealthProfileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkoutCreateWithoutUserInput = {
    id?: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    exercises?: ExerciseCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    exercises?: ExerciseUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutCreateOrConnectWithoutUserInput = {
    where: WorkoutWhereUniqueInput
    create: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>
  }

  export type WorkoutCreateManyUserInputEnvelope = {
    data: WorkoutCreateManyUserInput | WorkoutCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MealCreateWithoutUserInput = {
    id?: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    mealItems?: MealItemCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    mealItems?: MealItemUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealCreateOrConnectWithoutUserInput = {
    where: MealWhereUniqueInput
    create: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput>
  }

  export type MealCreateManyUserInputEnvelope = {
    data: MealCreateManyUserInput | MealCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MealItemCreateWithoutUserInput = {
    id?: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    meal: MealCreateNestedOneWithoutMealItemsInput
  }

  export type MealItemUncheckedCreateWithoutUserInput = {
    id?: string
    mealId: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealItemCreateOrConnectWithoutUserInput = {
    where: MealItemWhereUniqueInput
    create: XOR<MealItemCreateWithoutUserInput, MealItemUncheckedCreateWithoutUserInput>
  }

  export type MealItemCreateManyUserInputEnvelope = {
    data: MealItemCreateManyUserInput | MealItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProgressLogCreateWithoutUserInput = {
    id?: string
    date: Date | string
    waterL?: number | null
    sleepHrs?: number | null
    mood?: string | null
    weightKg?: number | null
    steps?: number | null
    activeMinutes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ProgressLogUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    waterL?: number | null
    sleepHrs?: number | null
    mood?: string | null
    weightKg?: number | null
    steps?: number | null
    activeMinutes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ProgressLogCreateOrConnectWithoutUserInput = {
    where: ProgressLogWhereUniqueInput
    create: XOR<ProgressLogCreateWithoutUserInput, ProgressLogUncheckedCreateWithoutUserInput>
  }

  export type ProgressLogCreateManyUserInputEnvelope = {
    data: ProgressLogCreateManyUserInput | ProgressLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WeightEntryCreateWithoutUserInput = {
    id?: string
    weightKg: number
    date: Date | string
    photo?: string | null
    notes?: string | null
    bodyFatPercentage?: number | null
    muscleMassKg?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WeightEntryUncheckedCreateWithoutUserInput = {
    id?: string
    weightKg: number
    date: Date | string
    photo?: string | null
    notes?: string | null
    bodyFatPercentage?: number | null
    muscleMassKg?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WeightEntryCreateOrConnectWithoutUserInput = {
    where: WeightEntryWhereUniqueInput
    create: XOR<WeightEntryCreateWithoutUserInput, WeightEntryUncheckedCreateWithoutUserInput>
  }

  export type WeightEntryCreateManyUserInputEnvelope = {
    data: WeightEntryCreateManyUserInput | WeightEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WaterIntakeCreateWithoutUserInput = {
    id?: string
    amountMl: number
    date: Date | string
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WaterIntakeUncheckedCreateWithoutUserInput = {
    id?: string
    amountMl: number
    date: Date | string
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WaterIntakeCreateOrConnectWithoutUserInput = {
    where: WaterIntakeWhereUniqueInput
    create: XOR<WaterIntakeCreateWithoutUserInput, WaterIntakeUncheckedCreateWithoutUserInput>
  }

  export type WaterIntakeCreateManyUserInputEnvelope = {
    data: WaterIntakeCreateManyUserInput | WaterIntakeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SleepEntryCreateWithoutUserInput = {
    id?: string
    hours: number
    quality: string
    date: Date | string
    bedtime?: Date | string | null
    wakeTime?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type SleepEntryUncheckedCreateWithoutUserInput = {
    id?: string
    hours: number
    quality: string
    date: Date | string
    bedtime?: Date | string | null
    wakeTime?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type SleepEntryCreateOrConnectWithoutUserInput = {
    where: SleepEntryWhereUniqueInput
    create: XOR<SleepEntryCreateWithoutUserInput, SleepEntryUncheckedCreateWithoutUserInput>
  }

  export type SleepEntryCreateManyUserInputEnvelope = {
    data: SleepEntryCreateManyUserInput | SleepEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GoalCreateWithoutUserInput = {
    id?: string
    type: string
    target: number
    current?: number
    unit: string
    startDate: Date | string
    endDate?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type GoalUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    target: number
    current?: number
    unit: string
    startDate: Date | string
    endDate?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type GoalCreateOrConnectWithoutUserInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput>
  }

  export type GoalCreateManyUserInputEnvelope = {
    data: GoalCreateManyUserInput | GoalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HealthProfileUpsertWithWhereUniqueWithoutUserInput = {
    where: HealthProfileWhereUniqueInput
    update: XOR<HealthProfileUpdateWithoutUserInput, HealthProfileUncheckedUpdateWithoutUserInput>
    create: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
  }

  export type HealthProfileUpdateWithWhereUniqueWithoutUserInput = {
    where: HealthProfileWhereUniqueInput
    data: XOR<HealthProfileUpdateWithoutUserInput, HealthProfileUncheckedUpdateWithoutUserInput>
  }

  export type HealthProfileUpdateManyWithWhereWithoutUserInput = {
    where: HealthProfileScalarWhereInput
    data: XOR<HealthProfileUpdateManyMutationInput, HealthProfileUncheckedUpdateManyWithoutUserInput>
  }

  export type HealthProfileScalarWhereInput = {
    AND?: HealthProfileScalarWhereInput | HealthProfileScalarWhereInput[]
    OR?: HealthProfileScalarWhereInput[]
    NOT?: HealthProfileScalarWhereInput | HealthProfileScalarWhereInput[]
    id?: StringFilter<"HealthProfile"> | string
    userId?: StringFilter<"HealthProfile"> | string
    height?: FloatNullableFilter<"HealthProfile"> | number | null
    weight?: FloatNullableFilter<"HealthProfile"> | number | null
    age?: IntNullableFilter<"HealthProfile"> | number | null
    gender?: StringNullableFilter<"HealthProfile"> | string | null
    birthday?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    targetWeight?: FloatNullableFilter<"HealthProfile"> | number | null
    targetCalories?: IntNullableFilter<"HealthProfile"> | number | null
    targetWaterL?: FloatNullableFilter<"HealthProfile"> | number | null
    activityLevel?: StringNullableFilter<"HealthProfile"> | string | null
    fitnessGoal?: StringNullableFilter<"HealthProfile"> | string | null
    heightUnit?: StringNullableFilter<"HealthProfile"> | string | null
    weightUnit?: StringNullableFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeFilter<"HealthProfile"> | Date | string
    syncedAt?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    isDeleted?: BoolFilter<"HealthProfile"> | boolean
  }

  export type WorkoutUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkoutWhereUniqueInput
    update: XOR<WorkoutUpdateWithoutUserInput, WorkoutUncheckedUpdateWithoutUserInput>
    create: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>
  }

  export type WorkoutUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkoutWhereUniqueInput
    data: XOR<WorkoutUpdateWithoutUserInput, WorkoutUncheckedUpdateWithoutUserInput>
  }

  export type WorkoutUpdateManyWithWhereWithoutUserInput = {
    where: WorkoutScalarWhereInput
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkoutScalarWhereInput = {
    AND?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
    OR?: WorkoutScalarWhereInput[]
    NOT?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
    id?: StringFilter<"Workout"> | string
    userId?: StringFilter<"Workout"> | string
    title?: StringFilter<"Workout"> | string
    category?: StringFilter<"Workout"> | string
    durationMin?: IntNullableFilter<"Workout"> | number | null
    calories?: IntNullableFilter<"Workout"> | number | null
    date?: DateTimeFilter<"Workout"> | Date | string
    notes?: StringNullableFilter<"Workout"> | string | null
    isCompleted?: BoolFilter<"Workout"> | boolean
    totalTime?: IntNullableFilter<"Workout"> | number | null
    restTime?: IntNullableFilter<"Workout"> | number | null
    createdAt?: DateTimeFilter<"Workout"> | Date | string
    updatedAt?: DateTimeFilter<"Workout"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Workout"> | Date | string | null
    isDeleted?: BoolFilter<"Workout"> | boolean
  }

  export type MealUpsertWithWhereUniqueWithoutUserInput = {
    where: MealWhereUniqueInput
    update: XOR<MealUpdateWithoutUserInput, MealUncheckedUpdateWithoutUserInput>
    create: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput>
  }

  export type MealUpdateWithWhereUniqueWithoutUserInput = {
    where: MealWhereUniqueInput
    data: XOR<MealUpdateWithoutUserInput, MealUncheckedUpdateWithoutUserInput>
  }

  export type MealUpdateManyWithWhereWithoutUserInput = {
    where: MealScalarWhereInput
    data: XOR<MealUpdateManyMutationInput, MealUncheckedUpdateManyWithoutUserInput>
  }

  export type MealScalarWhereInput = {
    AND?: MealScalarWhereInput | MealScalarWhereInput[]
    OR?: MealScalarWhereInput[]
    NOT?: MealScalarWhereInput | MealScalarWhereInput[]
    id?: StringFilter<"Meal"> | string
    userId?: StringFilter<"Meal"> | string
    name?: StringFilter<"Meal"> | string
    mealType?: StringFilter<"Meal"> | string
    calories?: IntNullableFilter<"Meal"> | number | null
    protein?: FloatNullableFilter<"Meal"> | number | null
    carbs?: FloatNullableFilter<"Meal"> | number | null
    fat?: FloatNullableFilter<"Meal"> | number | null
    date?: DateTimeFilter<"Meal"> | Date | string
    notes?: StringNullableFilter<"Meal"> | string | null
    createdAt?: DateTimeFilter<"Meal"> | Date | string
    updatedAt?: DateTimeFilter<"Meal"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Meal"> | Date | string | null
    isDeleted?: BoolFilter<"Meal"> | boolean
  }

  export type MealItemUpsertWithWhereUniqueWithoutUserInput = {
    where: MealItemWhereUniqueInput
    update: XOR<MealItemUpdateWithoutUserInput, MealItemUncheckedUpdateWithoutUserInput>
    create: XOR<MealItemCreateWithoutUserInput, MealItemUncheckedCreateWithoutUserInput>
  }

  export type MealItemUpdateWithWhereUniqueWithoutUserInput = {
    where: MealItemWhereUniqueInput
    data: XOR<MealItemUpdateWithoutUserInput, MealItemUncheckedUpdateWithoutUserInput>
  }

  export type MealItemUpdateManyWithWhereWithoutUserInput = {
    where: MealItemScalarWhereInput
    data: XOR<MealItemUpdateManyMutationInput, MealItemUncheckedUpdateManyWithoutUserInput>
  }

  export type MealItemScalarWhereInput = {
    AND?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
    OR?: MealItemScalarWhereInput[]
    NOT?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
    id?: StringFilter<"MealItem"> | string
    mealId?: StringFilter<"MealItem"> | string
    userId?: StringFilter<"MealItem"> | string
    name?: StringFilter<"MealItem"> | string
    calories?: IntNullableFilter<"MealItem"> | number | null
    protein?: FloatNullableFilter<"MealItem"> | number | null
    carbs?: FloatNullableFilter<"MealItem"> | number | null
    fat?: FloatNullableFilter<"MealItem"> | number | null
    quantity?: FloatNullableFilter<"MealItem"> | number | null
    unit?: StringNullableFilter<"MealItem"> | string | null
    isHighInProtein?: BoolFilter<"MealItem"> | boolean
    createdAt?: DateTimeFilter<"MealItem"> | Date | string
    updatedAt?: DateTimeFilter<"MealItem"> | Date | string
    syncedAt?: DateTimeNullableFilter<"MealItem"> | Date | string | null
    isDeleted?: BoolFilter<"MealItem"> | boolean
  }

  export type ProgressLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgressLogWhereUniqueInput
    update: XOR<ProgressLogUpdateWithoutUserInput, ProgressLogUncheckedUpdateWithoutUserInput>
    create: XOR<ProgressLogCreateWithoutUserInput, ProgressLogUncheckedCreateWithoutUserInput>
  }

  export type ProgressLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgressLogWhereUniqueInput
    data: XOR<ProgressLogUpdateWithoutUserInput, ProgressLogUncheckedUpdateWithoutUserInput>
  }

  export type ProgressLogUpdateManyWithWhereWithoutUserInput = {
    where: ProgressLogScalarWhereInput
    data: XOR<ProgressLogUpdateManyMutationInput, ProgressLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ProgressLogScalarWhereInput = {
    AND?: ProgressLogScalarWhereInput | ProgressLogScalarWhereInput[]
    OR?: ProgressLogScalarWhereInput[]
    NOT?: ProgressLogScalarWhereInput | ProgressLogScalarWhereInput[]
    id?: StringFilter<"ProgressLog"> | string
    userId?: StringFilter<"ProgressLog"> | string
    date?: DateTimeFilter<"ProgressLog"> | Date | string
    waterL?: FloatNullableFilter<"ProgressLog"> | number | null
    sleepHrs?: FloatNullableFilter<"ProgressLog"> | number | null
    mood?: StringNullableFilter<"ProgressLog"> | string | null
    weightKg?: FloatNullableFilter<"ProgressLog"> | number | null
    steps?: IntNullableFilter<"ProgressLog"> | number | null
    activeMinutes?: IntNullableFilter<"ProgressLog"> | number | null
    createdAt?: DateTimeFilter<"ProgressLog"> | Date | string
    updatedAt?: DateTimeFilter<"ProgressLog"> | Date | string
    syncedAt?: DateTimeNullableFilter<"ProgressLog"> | Date | string | null
    isDeleted?: BoolFilter<"ProgressLog"> | boolean
  }

  export type WeightEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: WeightEntryWhereUniqueInput
    update: XOR<WeightEntryUpdateWithoutUserInput, WeightEntryUncheckedUpdateWithoutUserInput>
    create: XOR<WeightEntryCreateWithoutUserInput, WeightEntryUncheckedCreateWithoutUserInput>
  }

  export type WeightEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: WeightEntryWhereUniqueInput
    data: XOR<WeightEntryUpdateWithoutUserInput, WeightEntryUncheckedUpdateWithoutUserInput>
  }

  export type WeightEntryUpdateManyWithWhereWithoutUserInput = {
    where: WeightEntryScalarWhereInput
    data: XOR<WeightEntryUpdateManyMutationInput, WeightEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type WeightEntryScalarWhereInput = {
    AND?: WeightEntryScalarWhereInput | WeightEntryScalarWhereInput[]
    OR?: WeightEntryScalarWhereInput[]
    NOT?: WeightEntryScalarWhereInput | WeightEntryScalarWhereInput[]
    id?: StringFilter<"WeightEntry"> | string
    userId?: StringFilter<"WeightEntry"> | string
    weightKg?: FloatFilter<"WeightEntry"> | number
    date?: DateTimeFilter<"WeightEntry"> | Date | string
    photo?: StringNullableFilter<"WeightEntry"> | string | null
    notes?: StringNullableFilter<"WeightEntry"> | string | null
    bodyFatPercentage?: FloatNullableFilter<"WeightEntry"> | number | null
    muscleMassKg?: FloatNullableFilter<"WeightEntry"> | number | null
    createdAt?: DateTimeFilter<"WeightEntry"> | Date | string
    updatedAt?: DateTimeFilter<"WeightEntry"> | Date | string
    syncedAt?: DateTimeNullableFilter<"WeightEntry"> | Date | string | null
    isDeleted?: BoolFilter<"WeightEntry"> | boolean
  }

  export type WaterIntakeUpsertWithWhereUniqueWithoutUserInput = {
    where: WaterIntakeWhereUniqueInput
    update: XOR<WaterIntakeUpdateWithoutUserInput, WaterIntakeUncheckedUpdateWithoutUserInput>
    create: XOR<WaterIntakeCreateWithoutUserInput, WaterIntakeUncheckedCreateWithoutUserInput>
  }

  export type WaterIntakeUpdateWithWhereUniqueWithoutUserInput = {
    where: WaterIntakeWhereUniqueInput
    data: XOR<WaterIntakeUpdateWithoutUserInput, WaterIntakeUncheckedUpdateWithoutUserInput>
  }

  export type WaterIntakeUpdateManyWithWhereWithoutUserInput = {
    where: WaterIntakeScalarWhereInput
    data: XOR<WaterIntakeUpdateManyMutationInput, WaterIntakeUncheckedUpdateManyWithoutUserInput>
  }

  export type WaterIntakeScalarWhereInput = {
    AND?: WaterIntakeScalarWhereInput | WaterIntakeScalarWhereInput[]
    OR?: WaterIntakeScalarWhereInput[]
    NOT?: WaterIntakeScalarWhereInput | WaterIntakeScalarWhereInput[]
    id?: StringFilter<"WaterIntake"> | string
    userId?: StringFilter<"WaterIntake"> | string
    amountMl?: IntFilter<"WaterIntake"> | number
    date?: DateTimeFilter<"WaterIntake"> | Date | string
    time?: DateTimeFilter<"WaterIntake"> | Date | string
    createdAt?: DateTimeFilter<"WaterIntake"> | Date | string
    updatedAt?: DateTimeFilter<"WaterIntake"> | Date | string
    syncedAt?: DateTimeNullableFilter<"WaterIntake"> | Date | string | null
    isDeleted?: BoolFilter<"WaterIntake"> | boolean
  }

  export type SleepEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: SleepEntryWhereUniqueInput
    update: XOR<SleepEntryUpdateWithoutUserInput, SleepEntryUncheckedUpdateWithoutUserInput>
    create: XOR<SleepEntryCreateWithoutUserInput, SleepEntryUncheckedCreateWithoutUserInput>
  }

  export type SleepEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: SleepEntryWhereUniqueInput
    data: XOR<SleepEntryUpdateWithoutUserInput, SleepEntryUncheckedUpdateWithoutUserInput>
  }

  export type SleepEntryUpdateManyWithWhereWithoutUserInput = {
    where: SleepEntryScalarWhereInput
    data: XOR<SleepEntryUpdateManyMutationInput, SleepEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type SleepEntryScalarWhereInput = {
    AND?: SleepEntryScalarWhereInput | SleepEntryScalarWhereInput[]
    OR?: SleepEntryScalarWhereInput[]
    NOT?: SleepEntryScalarWhereInput | SleepEntryScalarWhereInput[]
    id?: StringFilter<"SleepEntry"> | string
    userId?: StringFilter<"SleepEntry"> | string
    hours?: FloatFilter<"SleepEntry"> | number
    quality?: StringFilter<"SleepEntry"> | string
    date?: DateTimeFilter<"SleepEntry"> | Date | string
    bedtime?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    wakeTime?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    notes?: StringNullableFilter<"SleepEntry"> | string | null
    createdAt?: DateTimeFilter<"SleepEntry"> | Date | string
    updatedAt?: DateTimeFilter<"SleepEntry"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SleepEntry"> | Date | string | null
    isDeleted?: BoolFilter<"SleepEntry"> | boolean
  }

  export type GoalUpsertWithWhereUniqueWithoutUserInput = {
    where: GoalWhereUniqueInput
    update: XOR<GoalUpdateWithoutUserInput, GoalUncheckedUpdateWithoutUserInput>
    create: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput>
  }

  export type GoalUpdateWithWhereUniqueWithoutUserInput = {
    where: GoalWhereUniqueInput
    data: XOR<GoalUpdateWithoutUserInput, GoalUncheckedUpdateWithoutUserInput>
  }

  export type GoalUpdateManyWithWhereWithoutUserInput = {
    where: GoalScalarWhereInput
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyWithoutUserInput>
  }

  export type GoalScalarWhereInput = {
    AND?: GoalScalarWhereInput | GoalScalarWhereInput[]
    OR?: GoalScalarWhereInput[]
    NOT?: GoalScalarWhereInput | GoalScalarWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    type?: StringFilter<"Goal"> | string
    target?: FloatFilter<"Goal"> | number
    current?: FloatFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeNullableFilter<"Goal"> | Date | string | null
    isActive?: BoolFilter<"Goal"> | boolean
    notes?: StringNullableFilter<"Goal"> | string | null
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Goal"> | Date | string | null
    isDeleted?: BoolFilter<"Goal"> | boolean
  }

  export type UserCreateWithoutHealthProfilesInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHealthProfilesInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHealthProfilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHealthProfilesInput, UserUncheckedCreateWithoutHealthProfilesInput>
  }

  export type UserUpsertWithoutHealthProfilesInput = {
    update: XOR<UserUpdateWithoutHealthProfilesInput, UserUncheckedUpdateWithoutHealthProfilesInput>
    create: XOR<UserCreateWithoutHealthProfilesInput, UserUncheckedCreateWithoutHealthProfilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHealthProfilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHealthProfilesInput, UserUncheckedUpdateWithoutHealthProfilesInput>
  }

  export type UserUpdateWithoutHealthProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHealthProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWorkoutsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkoutsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkoutsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
  }

  export type ExerciseCreateWithoutWorkoutInput = {
    id?: string
    name: string
    sets?: number | null
    reps?: number | null
    weightKg?: number | null
    duration?: number | null
    distance?: number | null
    restTime?: number | null
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ExerciseUncheckedCreateWithoutWorkoutInput = {
    id?: string
    name: string
    sets?: number | null
    reps?: number | null
    weightKg?: number | null
    duration?: number | null
    distance?: number | null
    restTime?: number | null
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ExerciseCreateOrConnectWithoutWorkoutInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutWorkoutInput, ExerciseUncheckedCreateWithoutWorkoutInput>
  }

  export type ExerciseCreateManyWorkoutInputEnvelope = {
    data: ExerciseCreateManyWorkoutInput | ExerciseCreateManyWorkoutInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWorkoutsInput = {
    update: XOR<UserUpdateWithoutWorkoutsInput, UserUncheckedUpdateWithoutWorkoutsInput>
    create: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkoutsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkoutsInput, UserUncheckedUpdateWithoutWorkoutsInput>
  }

  export type UserUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExerciseUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutWorkoutInput, ExerciseUncheckedUpdateWithoutWorkoutInput>
    create: XOR<ExerciseCreateWithoutWorkoutInput, ExerciseUncheckedCreateWithoutWorkoutInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutWorkoutInput, ExerciseUncheckedUpdateWithoutWorkoutInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutWorkoutInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutWorkoutInput>
  }

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    OR?: ExerciseScalarWhereInput[]
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    id?: StringFilter<"Exercise"> | string
    workoutId?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    sets?: IntNullableFilter<"Exercise"> | number | null
    reps?: IntNullableFilter<"Exercise"> | number | null
    weightKg?: FloatNullableFilter<"Exercise"> | number | null
    duration?: IntNullableFilter<"Exercise"> | number | null
    distance?: FloatNullableFilter<"Exercise"> | number | null
    restTime?: IntNullableFilter<"Exercise"> | number | null
    order?: IntFilter<"Exercise"> | number
    isCompleted?: BoolFilter<"Exercise"> | boolean
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    syncedAt?: DateTimeNullableFilter<"Exercise"> | Date | string | null
    isDeleted?: BoolFilter<"Exercise"> | boolean
  }

  export type WorkoutCreateWithoutExercisesInput = {
    id?: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutWorkoutsInput
  }

  export type WorkoutUncheckedCreateWithoutExercisesInput = {
    id?: string
    userId: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WorkoutCreateOrConnectWithoutExercisesInput = {
    where: WorkoutWhereUniqueInput
    create: XOR<WorkoutCreateWithoutExercisesInput, WorkoutUncheckedCreateWithoutExercisesInput>
  }

  export type WorkoutUpsertWithoutExercisesInput = {
    update: XOR<WorkoutUpdateWithoutExercisesInput, WorkoutUncheckedUpdateWithoutExercisesInput>
    create: XOR<WorkoutCreateWithoutExercisesInput, WorkoutUncheckedCreateWithoutExercisesInput>
    where?: WorkoutWhereInput
  }

  export type WorkoutUpdateToOneWithWhereWithoutExercisesInput = {
    where?: WorkoutWhereInput
    data: XOR<WorkoutUpdateWithoutExercisesInput, WorkoutUncheckedUpdateWithoutExercisesInput>
  }

  export type WorkoutUpdateWithoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutWorkoutsNestedInput
  }

  export type WorkoutUncheckedUpdateWithoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutMealsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMealsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMealsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
  }

  export type MealItemCreateWithoutMealInput = {
    id?: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutMealItemsInput
  }

  export type MealItemUncheckedCreateWithoutMealInput = {
    id?: string
    userId: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealItemCreateOrConnectWithoutMealInput = {
    where: MealItemWhereUniqueInput
    create: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput>
  }

  export type MealItemCreateManyMealInputEnvelope = {
    data: MealItemCreateManyMealInput | MealItemCreateManyMealInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMealsInput = {
    update: XOR<UserUpdateWithoutMealsInput, UserUncheckedUpdateWithoutMealsInput>
    create: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMealsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMealsInput, UserUncheckedUpdateWithoutMealsInput>
  }

  export type UserUpdateWithoutMealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MealItemUpsertWithWhereUniqueWithoutMealInput = {
    where: MealItemWhereUniqueInput
    update: XOR<MealItemUpdateWithoutMealInput, MealItemUncheckedUpdateWithoutMealInput>
    create: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput>
  }

  export type MealItemUpdateWithWhereUniqueWithoutMealInput = {
    where: MealItemWhereUniqueInput
    data: XOR<MealItemUpdateWithoutMealInput, MealItemUncheckedUpdateWithoutMealInput>
  }

  export type MealItemUpdateManyWithWhereWithoutMealInput = {
    where: MealItemScalarWhereInput
    data: XOR<MealItemUpdateManyMutationInput, MealItemUncheckedUpdateManyWithoutMealInput>
  }

  export type MealCreateWithoutMealItemsInput = {
    id?: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutMealsInput
  }

  export type MealUncheckedCreateWithoutMealItemsInput = {
    id?: string
    userId: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealCreateOrConnectWithoutMealItemsInput = {
    where: MealWhereUniqueInput
    create: XOR<MealCreateWithoutMealItemsInput, MealUncheckedCreateWithoutMealItemsInput>
  }

  export type UserCreateWithoutMealItemsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMealItemsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMealItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMealItemsInput, UserUncheckedCreateWithoutMealItemsInput>
  }

  export type MealUpsertWithoutMealItemsInput = {
    update: XOR<MealUpdateWithoutMealItemsInput, MealUncheckedUpdateWithoutMealItemsInput>
    create: XOR<MealCreateWithoutMealItemsInput, MealUncheckedCreateWithoutMealItemsInput>
    where?: MealWhereInput
  }

  export type MealUpdateToOneWithWhereWithoutMealItemsInput = {
    where?: MealWhereInput
    data: XOR<MealUpdateWithoutMealItemsInput, MealUncheckedUpdateWithoutMealItemsInput>
  }

  export type MealUpdateWithoutMealItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutMealsNestedInput
  }

  export type MealUncheckedUpdateWithoutMealItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUpsertWithoutMealItemsInput = {
    update: XOR<UserUpdateWithoutMealItemsInput, UserUncheckedUpdateWithoutMealItemsInput>
    create: XOR<UserCreateWithoutMealItemsInput, UserUncheckedCreateWithoutMealItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMealItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMealItemsInput, UserUncheckedUpdateWithoutMealItemsInput>
  }

  export type UserUpdateWithoutMealItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMealItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProgressLogsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProgressLogsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProgressLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgressLogsInput, UserUncheckedCreateWithoutProgressLogsInput>
  }

  export type UserUpsertWithoutProgressLogsInput = {
    update: XOR<UserUpdateWithoutProgressLogsInput, UserUncheckedUpdateWithoutProgressLogsInput>
    create: XOR<UserCreateWithoutProgressLogsInput, UserUncheckedCreateWithoutProgressLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgressLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgressLogsInput, UserUncheckedUpdateWithoutProgressLogsInput>
  }

  export type UserUpdateWithoutProgressLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProgressLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWeightEntriesInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWeightEntriesInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWeightEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWeightEntriesInput, UserUncheckedCreateWithoutWeightEntriesInput>
  }

  export type UserUpsertWithoutWeightEntriesInput = {
    update: XOR<UserUpdateWithoutWeightEntriesInput, UserUncheckedUpdateWithoutWeightEntriesInput>
    create: XOR<UserCreateWithoutWeightEntriesInput, UserUncheckedCreateWithoutWeightEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWeightEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWeightEntriesInput, UserUncheckedUpdateWithoutWeightEntriesInput>
  }

  export type UserUpdateWithoutWeightEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWeightEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWaterIntakeInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWaterIntakeInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWaterIntakeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWaterIntakeInput, UserUncheckedCreateWithoutWaterIntakeInput>
  }

  export type UserUpsertWithoutWaterIntakeInput = {
    update: XOR<UserUpdateWithoutWaterIntakeInput, UserUncheckedUpdateWithoutWaterIntakeInput>
    create: XOR<UserCreateWithoutWaterIntakeInput, UserUncheckedCreateWithoutWaterIntakeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWaterIntakeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWaterIntakeInput, UserUncheckedUpdateWithoutWaterIntakeInput>
  }

  export type UserUpdateWithoutWaterIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWaterIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSleepEntriesInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSleepEntriesInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSleepEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSleepEntriesInput, UserUncheckedCreateWithoutSleepEntriesInput>
  }

  export type UserUpsertWithoutSleepEntriesInput = {
    update: XOR<UserUpdateWithoutSleepEntriesInput, UserUncheckedUpdateWithoutSleepEntriesInput>
    create: XOR<UserCreateWithoutSleepEntriesInput, UserUncheckedCreateWithoutSleepEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSleepEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSleepEntriesInput, UserUncheckedUpdateWithoutSleepEntriesInput>
  }

  export type UserUpdateWithoutSleepEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSleepEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutGoalsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    mealItems?: MealItemCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGoalsInput = {
    id?: string
    clerkId: string
    name?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfiles?: HealthProfileUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    mealItems?: MealItemUncheckedCreateNestedManyWithoutUserInput
    progressLogs?: ProgressLogUncheckedCreateNestedManyWithoutUserInput
    weightEntries?: WeightEntryUncheckedCreateNestedManyWithoutUserInput
    waterIntake?: WaterIntakeUncheckedCreateNestedManyWithoutUserInput
    sleepEntries?: SleepEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGoalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
  }

  export type UserUpsertWithoutGoalsInput = {
    update: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGoalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type UserUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfiles?: HealthProfileUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    mealItems?: MealItemUncheckedUpdateManyWithoutUserNestedInput
    progressLogs?: ProgressLogUncheckedUpdateManyWithoutUserNestedInput
    weightEntries?: WeightEntryUncheckedUpdateManyWithoutUserNestedInput
    waterIntake?: WaterIntakeUncheckedUpdateManyWithoutUserNestedInput
    sleepEntries?: SleepEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type HealthProfileCreateManyUserInput = {
    id?: string
    height?: number | null
    weight?: number | null
    age?: number | null
    gender?: string | null
    birthday?: Date | string | null
    targetWeight?: number | null
    targetCalories?: number | null
    targetWaterL?: number | null
    activityLevel?: string | null
    fitnessGoal?: string | null
    heightUnit?: string | null
    weightUnit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WorkoutCreateManyUserInput = {
    id?: string
    title: string
    category: string
    durationMin?: number | null
    calories?: number | null
    date: Date | string
    notes?: string | null
    isCompleted?: boolean
    totalTime?: number | null
    restTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealCreateManyUserInput = {
    id?: string
    name: string
    mealType: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    date: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealItemCreateManyUserInput = {
    id?: string
    mealId: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ProgressLogCreateManyUserInput = {
    id?: string
    date: Date | string
    waterL?: number | null
    sleepHrs?: number | null
    mood?: string | null
    weightKg?: number | null
    steps?: number | null
    activeMinutes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WeightEntryCreateManyUserInput = {
    id?: string
    weightKg: number
    date: Date | string
    photo?: string | null
    notes?: string | null
    bodyFatPercentage?: number | null
    muscleMassKg?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type WaterIntakeCreateManyUserInput = {
    id?: string
    amountMl: number
    date: Date | string
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type SleepEntryCreateManyUserInput = {
    id?: string
    hours: number
    quality: string
    date: Date | string
    bedtime?: Date | string | null
    wakeTime?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type GoalCreateManyUserInput = {
    id?: string
    type: string
    target: number
    current?: number
    unit: string
    startDate: Date | string
    endDate?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type HealthProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HealthProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HealthProfileUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetWaterL?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoal?: NullableStringFieldUpdateOperationsInput | string | null
    heightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    weightUnit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkoutUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    exercises?: ExerciseUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    exercises?: ExerciseUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    durationMin?: NullableIntFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    mealItems?: MealItemUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    mealItems?: MealItemUncheckedUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    meal?: MealUpdateOneRequiredWithoutMealItemsNestedInput
  }

  export type MealItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    waterL?: NullableFloatFieldUpdateOperationsInput | number | null
    sleepHrs?: NullableFloatFieldUpdateOperationsInput | number | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    steps?: NullableIntFieldUpdateOperationsInput | number | null
    activeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WeightEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WeightEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WeightEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bodyFatPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleMassKg?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WaterIntakeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WaterIntakeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WaterIntakeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountMl?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SleepEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SleepEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SleepEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    quality?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    bedtime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wakeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExerciseCreateManyWorkoutInput = {
    id?: string
    name: string
    sets?: number | null
    reps?: number | null
    weightKg?: number | null
    duration?: number | null
    distance?: number | null
    restTime?: number | null
    order?: number
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type ExerciseUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExerciseUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExerciseUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    restTime?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemCreateManyMealInput = {
    id?: string
    userId: string
    name: string
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    quantity?: number | null
    unit?: string | null
    isHighInProtein?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    isDeleted?: boolean
  }

  export type MealItemUpdateWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutMealItemsNestedInput
  }

  export type MealItemUncheckedUpdateWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MealItemUncheckedUpdateManyWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isHighInProtein?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}