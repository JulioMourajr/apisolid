import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkIns-repository";
import { CheckInsRepository } from "@/repositories/checkIns-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CheckinService } from "./checkinService";

let checkInsRepository: CheckInsRepository;
let sut: CheckinService;

describe("Checkin Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckinService(checkInsRepository);
  });

  it("should create a checkin", async () => {
    const { checkIn } = await sut.execute({
        gymId: "gym_id",
        userId: "user_id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should list all checkins", async () => {
    await sut.execute({
        gymId: "gym_id",
      userId: "user_id",
    });

    const checkIns = await sut.listCheckins();

    expect(checkIns).toHaveLength(1);
  });
});