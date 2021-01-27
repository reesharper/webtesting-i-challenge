const enhancer = require('./enhancer.js');
const Item = require('./item')
// test away!

test('sanity', () => {
  expect(23).toBe(23)
  expect(23).not.toBe(11)
  expect(23).toBeGreaterThan(11)
})
describe('Item class', () => {
  let sword
  beforeEach(() => {
    sword = new Item('sword', 90, 1)
  })
  it('exists', () => {
    expect(Item).toBeDefined()
  })
  it('creates instance of item', () => {
    expect(sword).toBeInstanceOf(Item)
  })
  it('item has durability', () => {
    expect(sword).toHaveProperty('durability')
    expect(sword.durability).toBe(90)
  })
  it('item has enhancement', () => {
    expect(sword).toHaveProperty('enhancement')
    expect(sword.enhancement).toBe(1)
  })
  it('enhancer has repair', () => {
    expect(enhancer.repair).toBeInstanceOf(Function)
  })
  it('repair method repairs item', () => {
    const repair = enhancer.repair(sword).durability
    expect(repair).toBe(100)
  })
  it('enhancer has success', () => {
    expect(enhancer.success).toBeInstanceOf(Function)
  })
  it('success method enhances item', () => {
    const success = enhancer.success(sword).enhancement
    expect(success).toBe(2)
  })
  let axe
  beforeEach(() => {
    axe = new Item('axe', 90, 20)
  })
  it("success method doesn't enhance past 20", () => {
    const success = enhancer.success(axe).enhancement
    expect(success).toBe(20)
  })
  it('enhancer has fail', () => {
    expect(enhancer.fail).toBeInstanceOf(Function)
  })
  it('fail method damages item by 5 when < 15', () => {
    const failEnhancement = enhancer.fail(sword).enhancement
    const failDurability= enhancer.fail(sword).durability
    expect(failEnhancement).toBe(1)
    expect(failDurability).toBe(85)
  })
  let dagger
  beforeEach(() => {
    dagger = new Item('dagger', 90, 15)
  })
  it('fail method damages item by 10 when level 15', () => {
    const failEnhancement = enhancer.fail(dagger).enhancement
    const failDurability= enhancer.fail(dagger).durability
    expect(failEnhancement).toBe(15)
    expect(failDurability).toBe(80)
  })
  let bow
  beforeEach(() => {
    bow = new Item('bow', 90, 18)
  })
  it('fail damages item by 10 / lose level when > 15', () => {
    const failEnhancement = enhancer.fail(bow).enhancement
    const failDurability= enhancer.fail(bow).durability
    expect(failEnhancement).toBe(17)
    expect(failDurability).toBe(80)
  })
})