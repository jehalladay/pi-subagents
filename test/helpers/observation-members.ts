/**
 * wb-km7q.11 (SDK-REACTIVE-FIBER-R2, program-triage-2026-10-18 child of wb-km7q; the rule-19 structural-exit child of wb-km7q.4,
 * orchestrator rulings R-B111 and R-B140): the member reader of wb-km7q.4's THE MEMBER CHECK (its B1 fail-closed check over
 * src/workbench/observation.ts), cured of the holes the gate measured in that bead's two readers. Cut #4 (f24afd78) read top-level
 * interface declarations only, so a class merged into NativeSnapshot or ObservationTrace and a declare module block of observation.ts
 * inside itself added members no journey fed (refusal #4, U1: O7, O15, O8). Cut #5 (58ba796d) refused those merges but kept a set of
 * the type names the module declares at its top level or imports, so a member typed by a name a declare global block declares read
 * as holding no members, and four one-edit mutants of that set and of its depth walk survived (refusal #5, U1 and U2, folded here by
 * R-B140). Neither cut is on trunk; wb-km7q.4 is blocked by this bead and its re-cut restates B1's claims over this reader (R-B140:
 * "a mechanical restatement of B1's claims over the child's landed member reader"). This reader READS the same-module merges
 * (DECLARATION) and reads a member's type as holding no members only when every node of it is a LEAF form, so it keeps no set of
 * declared or imported names at all. The falsifier census is test/workbench-observation-members-census.test.ts. It holds every
 * "- <word>: <claim>" line of this header equal, in order and byte for byte, to the roster exported for its section, gives every word
 * a calibration plant whose reading without the word differs, and holds every reading the reader makes to the TypeScript checker's
 * reading of the same text (ReadOptions lists the words a reading uses; every word by default).
 *
 * READING (observationMembers). It reads one text, the source of src/workbench/observation.ts, through the TypeScript parser and
 * nothing else. The ROOTS are NativeSnapshot and ObservationEvent; a READ NAME is a root or a name a root member expands through
 * (EXPANSION read interface: ObservationTrace and Interval today). A read name reads `?` when a REFUSAL form holds; otherwise its
 * members are the members of every declaration of it that a DECLARATION form reads, a member declared twice read twice. A root's
 * list holds, for each member, what MEMBER and EXPANSION read: an optional property as its name, as its expansion
 * (`<member>.<name>` each) or as `<member>.?` when its type is no LEAF; a required property as nothing; any other member as `?`. The
 * snapshot list is NativeSnapshot's and the event list is ObservationEvent's; a root that reads `?` has the list ["?"]. The order of a
 * list is not claimed (THE MEMBER CHECK compares sorted lists).
 *
 * DECLARATION (DECLARATION_FORMS; the declarations of a read name whose members are read):
 * - interface: a top-level interface declaration of the name, every one of them (interface merging)
 * - class merge: a top-level class declaration of the name, its elements read as members (class-interface merging)
 * - augmentation: an interface declaration of the name standing directly in the body of a top-level declare module block whose specifier starts with ./ or ../ and, joined to src/workbench, is src/workbench/observation, src/workbench/observation.js or src/workbench/observation.ts (observation.ts augmenting itself)
 * REFUSAL (REFUSAL_FORMS; fail closed: a read name reads `?` when one holds):
 * - missing: the module text holds no top-level interface declaration of the name
 * - elsewhere: the name stands somewhere in the module text other than as the name of a declaration a DECLARATION form reads, a type reference's name or an extends or implements clause's expression
 * - heritage: a declaration of the name that a DECLARATION form reads holds an extends or implements clause
 * - type parameters: a declaration of the name that a DECLARATION form reads holds type parameters
 * - class modifier: a class declaration of the name that class merge reads carries a modifier or decorator other than export and declare
 * MEMBER (MEMBER_FORMS; the members of a declaration a DECLARATION form reads):
 * - property: a property signature, or a class property declaration, named by an identifier and with no modifier but readonly (or public, on a class property); a root reads the optional ones (written with ?) and no required one, an expansion reads every one
 * - other member: any other member (a method, an accessor, an index, call or construct signature, a constructor, a static block, a semicolon element, or a member with another name or modifier) reads `?` in a root's list and `<member>.?` in an expansion
 * EXPANSION (EXPANSION_FORMS; a root member's whole type read one level down, each inner member read by MEMBER and LEAF):
 * - type literal: an optional root property whose whole type is a type literal reads as that literal's members, `<member>.<name>` each
 * - read interface: an optional root property whose whole type is a bare type reference (an identifier, no type arguments) to a name with a top-level interface declaration reads as that read name's members, `<member>.<name>` each, or as `<member>.?` when that name reads `?`
 * - inner interface: an expanded property whose whole type is a bare type reference to a name with a top-level interface declaration reads `<member>.<name>`, that interface's own members unread
 * LEAF (LEAF_FORMS; a property's type holds no members only when every node of it is one of these forms; any other node anywhere in it, and a property written with no type, makes it read `<member>.?`):
 * - string: the string keyword
 * - number: the number keyword
 * - string literal: a string literal type, a quoted string
 * - union: a union type whose every arm reads as a leaf
 * - readonly array: readonly T[], its element type T read as a leaf
 * - Readonly: Readonly<T> with one type argument, T read as a leaf, while the identifier Readonly stands nowhere in the module text but as a type reference's name
 * - Record: Record<string, V> with two type arguments, the first the string keyword and V read as a leaf, while the identifier Record stands nowhere in the module text but as a type reference's name
 * NOT READ (NOT_READ; each a named residual with a pinned quiet row and a loud twin in the census):
 * - other file: a declaration in another module's text, such as a declare module augmentation of observation.ts written in another file
 * - inner members: an expanded property's own members, such as Presentation's under node.presentation
 * - required root member: a required member of a root, such as NativeSnapshot's source and ObservationEvent's kind
 * - global interface: the members of the global interface behind a LEAF form, String for string and ReadonlyArray for readonly T[], a declare global block of the module augmenting it included
 *
 * Display paths added: none. Test-only: it parses the text handed to it and reads nothing else.
 */
import { posix } from "node:path";
import ts from "typescript";

/** A roster entry: a word the reader reads and the claim this header states for it. */
export interface Claim<W extends string = string> {
  readonly word: W;
  readonly claim: string;
}
const claims = <const W extends string>(entries: readonly (readonly [W, string])[]): readonly Claim<W>[] => entries.map(([word, claim]) => ({ word, claim }));
/** A roster's words, in order. */
export const words = <W extends string>(roster: readonly Claim<W>[]): W[] => roster.map(entry => entry.word);

/** The module whose text the reader reads. */
export const OBSERVATION_MODULE = "src/workbench/observation.ts";
/** The roots, in the order of the reading's lists. */
export const ROOTS = ["NativeSnapshot", "ObservationEvent"] as const;

export const DECLARATION_FORMS = claims([
  ["interface", "a top-level interface declaration of the name, every one of them (interface merging)"],
  ["class merge", "a top-level class declaration of the name, its elements read as members (class-interface merging)"],
  [
    "augmentation",
    "an interface declaration of the name standing directly in the body of a top-level declare module block whose specifier starts with ./ or ../ and, joined to src/workbench, is src/workbench/observation, src/workbench/observation.js or src/workbench/observation.ts (observation.ts augmenting itself)",
  ],
]);
export const REFUSAL_FORMS = claims([
  ["missing", "the module text holds no top-level interface declaration of the name"],
  [
    "elsewhere",
    "the name stands somewhere in the module text other than as the name of a declaration a DECLARATION form reads, a type reference's name or an extends or implements clause's expression",
  ],
  ["heritage", "a declaration of the name that a DECLARATION form reads holds an extends or implements clause"],
  ["type parameters", "a declaration of the name that a DECLARATION form reads holds type parameters"],
  ["class modifier", "a class declaration of the name that class merge reads carries a modifier or decorator other than export and declare"],
]);
export const MEMBER_FORMS = claims([
  [
    "property",
    "a property signature, or a class property declaration, named by an identifier and with no modifier but readonly (or public, on a class property); a root reads the optional ones (written with ?) and no required one, an expansion reads every one",
  ],
  [
    "other member",
    "any other member (a method, an accessor, an index, call or construct signature, a constructor, a static block, a semicolon element, or a member with another name or modifier) reads `?` in a root's list and `<member>.?` in an expansion",
  ],
]);
export const EXPANSION_FORMS = claims([
  ["type literal", "an optional root property whose whole type is a type literal reads as that literal's members, `<member>.<name>` each"],
  [
    "read interface",
    "an optional root property whose whole type is a bare type reference (an identifier, no type arguments) to a name with a top-level interface declaration reads as that read name's members, `<member>.<name>` each, or as `<member>.?` when that name reads `?`",
  ],
  [
    "inner interface",
    "an expanded property whose whole type is a bare type reference to a name with a top-level interface declaration reads `<member>.<name>`, that interface's own members unread",
  ],
]);
export const LEAF_FORMS = claims([
  ["string", "the string keyword"],
  ["number", "the number keyword"],
  ["string literal", "a string literal type, a quoted string"],
  ["union", "a union type whose every arm reads as a leaf"],
  ["readonly array", "readonly T[], its element type T read as a leaf"],
  ["Readonly", "Readonly<T> with one type argument, T read as a leaf, while the identifier Readonly stands nowhere in the module text but as a type reference's name"],
  [
    "Record",
    "Record<string, V> with two type arguments, the first the string keyword and V read as a leaf, while the identifier Record stands nowhere in the module text but as a type reference's name",
  ],
]);
export const NOT_READ = claims([
  ["other file", "a declaration in another module's text, such as a declare module augmentation of observation.ts written in another file"],
  ["inner members", "an expanded property's own members, such as Presentation's under node.presentation"],
  ["required root member", "a required member of a root, such as NativeSnapshot's source and ObservationEvent's kind"],
  [
    "global interface",
    "the members of the global interface behind a LEAF form, String for string and ReadonlyArray for readonly T[], a declare global block of the module augmenting it included",
  ],
]);

export type DeclarationWord = (typeof DECLARATION_FORMS)[number]["word"];
export type RefusalWord = (typeof REFUSAL_FORMS)[number]["word"];
export type MemberWord = (typeof MEMBER_FORMS)[number]["word"];
export type ExpansionWord = (typeof EXPANSION_FORMS)[number]["word"];
export type LeafWord = (typeof LEAF_FORMS)[number]["word"];
export type Word = DeclarationWord | RefusalWord | MemberWord | ExpansionWord | LeafWord;
/** The header's rostered sections, in header order: each section's heading word and its roster. */
export const HEADER_SECTIONS: readonly (readonly [string, readonly Claim[]])[] = [
  ["DECLARATION", DECLARATION_FORMS],
  ["REFUSAL", REFUSAL_FORMS],
  ["MEMBER", MEMBER_FORMS],
  ["EXPANSION", EXPANSION_FORMS],
  ["LEAF", LEAF_FORMS],
  ["NOT READ", NOT_READ],
];
/** Every word a reading can use, in header order. */
export const ALL_WORDS: readonly Word[] = [...words(DECLARATION_FORMS), ...words(REFUSAL_FORMS), ...words(MEMBER_FORMS), ...words(EXPANSION_FORMS), ...words(LEAF_FORMS)];

/** The words a reading uses (every word when absent). */
export interface ReadOptions {
  readonly words?: readonly Word[];
}
/** The reading: NativeSnapshot's list and ObservationEvent's list. */
export interface ObservationMembers {
  readonly snapshot: readonly string[];
  readonly event: readonly string[];
}

type Declaration = ts.InterfaceDeclaration | ts.ClassDeclaration;
type Member = ts.TypeElement | ts.ClassElement;
interface Property {
  readonly name: string;
  readonly optional: boolean;
  readonly type: ts.TypeNode | undefined;
}

/** The paths that name observation.ts itself, joined to its directory (DECLARATION augmentation). */
const SELF_PATHS: ReadonlySet<string> = new Set(["src/workbench/observation", "src/workbench/observation.js", "src/workbench/observation.ts"]);
/** Whether a declare module block's specifier names observation.ts itself (DECLARATION augmentation). */
export const namesThisModule = (specifier: string): boolean =>
  (specifier.startsWith("./") || specifier.startsWith("../")) && SELF_PATHS.has(posix.join(posix.dirname(OBSERVATION_MODULE), specifier));
const CLASS_MODIFIERS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.ExportKeyword, ts.SyntaxKind.DeclareKeyword]);
const SIGNATURE_MODIFIERS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.ReadonlyKeyword]);
const CLASS_PROPERTY_MODIFIERS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.ReadonlyKeyword, ts.SyntaxKind.PublicKeyword]);
const onlyModifiers = (modifiers: readonly ts.Node[] | undefined, allowed: ReadonlySet<ts.SyntaxKind>): boolean => (modifiers ?? []).every(modifier => allowed.has(modifier.kind));

/** THE MEMBER CHECK's reading of one module text (the header's READING, by the words `options` lists). */
export function observationMembers(text: string, options: ReadOptions = {}): ObservationMembers {
  const on: ReadonlySet<Word> = new Set(options.words ?? ALL_WORDS);
  const source = ts.createSourceFile(OBSERVATION_MODULE, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  /** The names with a top-level interface declaration. */
  const topInterfaces = new Set<string>();
  /** Each name's declarations that a DECLARATION form reads. */
  const declarations = new Map<string, Declaration[]>();
  /** The identifiers that stand as the name of a declaration a DECLARATION form reads. */
  const declarationNames = new Set<ts.Identifier>();
  const read = (declaration: Declaration, name: ts.Identifier): void => {
    declarations.set(name.text, [...(declarations.get(name.text) ?? []), declaration]);
    declarationNames.add(name);
  };
  for (const statement of source.statements) {
    if (ts.isInterfaceDeclaration(statement)) {
      topInterfaces.add(statement.name.text);
      if (on.has("interface")) read(statement, statement.name);
    } else if (ts.isClassDeclaration(statement)) {
      if (on.has("class merge") && statement.name !== undefined) read(statement, statement.name);
    } else if (ts.isModuleDeclaration(statement) && ts.isStringLiteral(statement.name) && statement.body !== undefined && ts.isModuleBlock(statement.body)) {
      if (on.has("augmentation") && namesThisModule(statement.name.text)) {
        for (const inner of statement.body.statements) if (ts.isInterfaceDeclaration(inner)) read(inner, inner.name);
      }
    }
  }
  /** Every name that stands elsewhere (REFUSAL elsewhere), and every name that stands other than as a type reference's name (LEAF). */
  const elsewhere = new Set<string>();
  const notTypeName = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      const parent = node.parent;
      const typeName = ts.isTypeReferenceNode(parent) && parent.typeName === node;
      const heritage = ts.isExpressionWithTypeArguments(parent) && parent.expression === node && ts.isHeritageClause(parent.parent);
      if (!typeName) notTypeName.add(node.text);
      if (!typeName && !heritage && !declarationNames.has(node)) elsewhere.add(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  /** Whether a read name reads `?` (REFUSAL). */
  const refused = (name: string): boolean => {
    if (on.has("elsewhere") && elsewhere.has(name)) return true;
    if (on.has("missing") && !topInterfaces.has(name)) return true;
    return (declarations.get(name) ?? []).some(
      declaration =>
        (on.has("heritage") && declaration.heritageClauses !== undefined) ||
        (on.has("type parameters") && declaration.typeParameters !== undefined) ||
        (on.has("class modifier") && ts.isClassDeclaration(declaration) && !onlyModifiers(declaration.modifiers, CLASS_MODIFIERS)),
    );
  };
  /** A member as a property (MEMBER property), or undefined for any other member. */
  const propertyOf = (member: Member): Property | undefined => {
    if (!on.has("property")) return undefined;
    if (ts.isPropertySignature(member) && ts.isIdentifier(member.name) && onlyModifiers(member.modifiers, SIGNATURE_MODIFIERS)) {
      return { name: member.name.text, optional: member.questionToken !== undefined, type: member.type };
    }
    if (ts.isPropertyDeclaration(member) && ts.isIdentifier(member.name) && onlyModifiers(member.modifiers, CLASS_PROPERTY_MODIFIERS)) {
      return { name: member.name.text, optional: member.questionToken !== undefined, type: member.type };
    }
    return undefined;
  };
  /** Whether a type holds no members (LEAF): every node of it is a LEAF form. */
  const leaf = (type: ts.TypeNode): boolean => {
    if (type.kind === ts.SyntaxKind.StringKeyword) return on.has("string");
    if (type.kind === ts.SyntaxKind.NumberKeyword) return on.has("number");
    if (ts.isLiteralTypeNode(type)) return on.has("string literal") && ts.isStringLiteral(type.literal);
    if (ts.isUnionTypeNode(type)) return on.has("union") && type.types.every(leaf);
    if (ts.isTypeOperatorNode(type)) return on.has("readonly array") && type.operator === ts.SyntaxKind.ReadonlyKeyword && ts.isArrayTypeNode(type.type) && leaf(type.type.elementType);
    if (ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName)) {
      const [first, second, ...rest] = type.typeArguments ?? [];
      if (type.typeName.text === "Readonly") return on.has("Readonly") && !notTypeName.has("Readonly") && first !== undefined && second === undefined && leaf(first);
      if (type.typeName.text === "Record") {
        return on.has("Record") && !notTypeName.has("Record") && first?.kind === ts.SyntaxKind.StringKeyword && second !== undefined && rest.length === 0 && leaf(second);
      }
    }
    return false;
  };
  /** The name a type references whole when it is a bare type reference to a name with a top-level interface declaration. */
  const interfaceOf = (type: ts.TypeNode): string | undefined =>
    ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName) && type.typeArguments === undefined && topInterfaces.has(type.typeName.text) ? type.typeName.text : undefined;
  const membersOf = (name: string): Member[] => (declarations.get(name) ?? []).flatMap((declaration): Member[] => [...declaration.members]);
  /** An expanded member's entries (EXPANSION, MEMBER and LEAF). */
  const inner = (parent: string, member: Member): string[] => {
    const property = propertyOf(member);
    if (property === undefined) return on.has("other member") ? [`${parent}.?`] : [];
    const type = property.type;
    if (type === undefined) return [`${parent}.?`];
    if (on.has("inner interface") && interfaceOf(type) !== undefined) return [`${parent}.${property.name}`];
    return leaf(type) ? [`${parent}.${property.name}`] : [`${parent}.?`];
  };
  /** A root member's entries (MEMBER, EXPANSION and LEAF). */
  const direct = (member: Member): string[] => {
    const property = propertyOf(member);
    if (property === undefined) return on.has("other member") ? ["?"] : [];
    if (!property.optional) return [];
    const { name, type } = property;
    if (type === undefined) return [`${name}.?`];
    if (on.has("type literal") && ts.isTypeLiteralNode(type)) return type.members.flatMap(entry => inner(name, entry));
    const reference = on.has("read interface") ? interfaceOf(type) : undefined;
    if (reference !== undefined) return refused(reference) ? [`${name}.?`] : membersOf(reference).flatMap(entry => inner(name, entry));
    return leaf(type) ? [name] : [`${name}.?`];
  };
  const rootOf = (name: string): string[] => (refused(name) ? ["?"] : membersOf(name).flatMap(direct));
  return { snapshot: rootOf("NativeSnapshot"), event: rootOf("ObservationEvent") };
}
